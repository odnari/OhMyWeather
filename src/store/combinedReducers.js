import { combineReducers } from 'redux'
import ui from './ui'
import location from './location'
import weather from './weather'

const combinedReducers = combineReducers({
  ui,
  location,
  weather
})

export default combinedReducers
