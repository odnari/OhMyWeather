import { connect } from 'react-redux'
import { fetchLocation } from '../../store/location'
import { fetchWeather } from '../../store/weather'
import Component from './App'

const mapState = ({ location, weather }) => ({
  location,
  forecast: weather.data,
  forecastLastUpdate: weather.lastUpdate,
  forecastError: weather.error
})

const mapDispatch = {
  fetchLocation,
  fetchWeather
}

export default connect(mapState, mapDispatch)(Component)
