import { combineReducers } from 'redux'
import ui from './ui'
import location from './location'

const combinedReducers = combineReducers({
  ui,
  location
})

export default combinedReducers
