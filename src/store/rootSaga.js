import { all } from 'redux-saga/effects'
import location from './location/saga'

export default function* rootSaga() {
  yield all([
    location()
  ])
}
