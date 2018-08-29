import { all } from 'redux-saga/effects'
import location from './location/saga'
import weather from './weather/saga'

export default function* rootSaga() {
  yield all([
    location(),
    weather()
  ])
}
