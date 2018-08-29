import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './styles'

class App extends Component {
  componentDidMount() {
    this.props.fetchLocation()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.lat !== prevProps.location.lat || this.props.location.lng !== prevProps.location.lng) {
      this.props.fetchWeather()
    }
  }

  render() {
    const { location, forecast, forecastLastUpdate } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Weather at your location!</Text>
        {
          forecast &&
          <Text>
            <Text>Temp: {forecast.temperature}</Text>
            <Text>{'\n'}</Text>
            <Text>Hum: {forecast.humidity}</Text>
            <Text>{'\n'}</Text>
            <Text>Last update: {forecastLastUpdate}</Text>
          </Text>
        }
      </View>
    )
  }
}

App.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired,
  forecastLastUpdate: PropTypes.number
}

export default App
