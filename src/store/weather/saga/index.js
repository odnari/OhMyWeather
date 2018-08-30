import { takeEvery, take, put, all, call, select, race } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { ACTIONS as WEATHER, fetchWeatherError, fetchWeatherSuccess } from '../index'
import { ACTIONS as LOCATION, fetchLocation } from '../../location'
import { setLoading } from '../../ui'
import { endpoints } from '../../../endpoints'

const selectLocation = ({location}) => ({...location})

const fetchLocationAndWeather = function* () {
  yield put(fetchLocation())

  const {locationSuccess, locationError} = yield race({
    locationSuccess: take(LOCATION.FETCH_LOCATION_SUCCESS),
    locationError: take(LOCATION.FETCH_LOCATION_ERROR)
  })

  yield fetchWeather()
}

const fetchWeather = function* () {
  yield setLoading(true)
  const location = yield select(selectLocation)
  try {
    const resp = yield fetch(endpoints.openweather.currentWeather.byLatLng(location.lat, location.lng))
    const json = yield resp.json()
    if (json.error) {
      throw new Error(json.error)
    }

    yield put(fetchWeatherSuccess({
      temperature: json.main.temp,
      humidity: json.main.humidity
    }))
  } catch (err) {
    yield call(Alert.alert, 'Error', err.message)
    yield put(fetchWeatherError(err))
  } finally {
    yield put(setLoading(false))
  }
}

const watchFetchLocationAndWeather = function* () {
  yield takeEvery(WEATHER.FETCH_WEATHER, fetchLocationAndWeather)
}

const rootSaga = function* () {
  yield all([
    watchFetchLocationAndWeather()
  ])
}

export default rootSaga
