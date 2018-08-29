import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import styles from './styles'
import Header from '../../components/Header/Header'

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
        <Header title="Weather at your location"/>
        <ScrollView contentContainerStyle={styles.content}>
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
        </ScrollView>
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
