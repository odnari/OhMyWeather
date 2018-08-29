import { takeEvery, put, all, call, select } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { ACTIONS as WEATHER, fetchWeatherError, fetchWeatherSuccess } from '../index'
import { setLoading } from '../../ui'
import { endpoints } from '../../../endpoints'

const selectLocation = ({location}) => ({...location})

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
    yield put(fetchWeatherError(err))
    yield call(Alert.alert, 'Error', err.message)
  } finally {
    yield put(setLoading(false))
  }
}

const watchFetchWeather = function* () {
  yield takeEvery(WEATHER.FETCH_WEATHER, fetchWeather)
}

const rootSaga = function* () {
  yield all([
    watchFetchWeather()
  ])
}

export default rootSaga
