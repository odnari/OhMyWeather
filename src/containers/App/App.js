import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import Header from '../../components/Header'
import ForecastItem from '../../components/ForecastItem'
import { forecastAgeTimeout } from '../../constants'
import styles from './styles'

class App extends Component {
  componentDidMount() {
    this.props.fetchWeather()
  }

  refreshForecast = () => {
    const { forecastLastUpdate, fetchWeather } = this.props
    const isForecastOutdated = this.checkIfForecastOutdated(forecastLastUpdate)

    if (isForecastOutdated) {
      fetchWeather()
    }
  }

  checkIfForecastOutdated = (forecastLastUpdate) => {
    return !forecastLastUpdate || forecastLastUpdate + forecastAgeTimeout < Date.now()
  }

  render() {
    const { forecast, forecastLastUpdate, loading } = this.props

    return (
      <View style={styles.container}>
        <Header title="Weather at your location"/>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshForecast}
            />
          }>
          {
            forecast &&
            <View>
              <ForecastItem label="Temperature" value={forecast.temperature.toFixed(2)} unit="°C"/>
              <ForecastItem label="Humidity" value={forecast.humidity.toFixed(2)} unit="%"/>
            </View>
          }
        </ScrollView>
        <View style={styles.lastUpdate}>
          {
            forecastLastUpdate &&
            <Text style={styles.caption}>Last update: {(new Date(forecastLastUpdate)).toLocaleString()}</Text>
          }
        </View>
      </View>
    )
  }
}

App.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  forecast: PropTypes.object,
  forecastLastUpdate: PropTypes.number,
  forecastError: PropTypes.object,
  loading: PropTypes.bool.isRequired
}

export default App
