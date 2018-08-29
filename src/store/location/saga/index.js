import { takeEvery, put, all, call } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { ACTIONS as LOCATION, fetchLocationError, fetchLocationSuccess } from '../index'
import { setLoading } from '../../ui'
import { fetchLocation } from '../../../utils/geolocation'
import { errorMessages } from '../../../constants'

const getLocation = function* () {
  yield setLoading(true)
  try {
    const position = yield fetchLocation()
    yield put(fetchLocationSuccess(position))
  } catch (err) {
    yield call(Alert.alert, errorMessages.geolocation.title, err.message)
    yield put(fetchLocationError(err))
  } finally {
    yield put(setLoading(false))
  }
}

const watchGetLocation = function* () {
  yield takeEvery(LOCATION.FETCH_LOCATION, getLocation)
}

const rootSaga = function* () {
  yield all([
    watchGetLocation()
  ])
}

export default rootSaga
