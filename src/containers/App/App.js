import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, RefreshControl } from 'react-native'
import Header from '../../components/Header'
import { forecastAgeTimeout } from '../../constants'
import styles from './styles'
import ForecastItem from '../../components/ForecastItem/ForecastItem'

class App extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.props.fetchLocation()
  }

  componentDidUpdate(prevProps) {
    const { forecastLastUpdate } = this.props

    this.fetchNewForecast(prevProps.location, prevProps.forecastLastUpdate)

    if (forecastLastUpdate !== prevProps.forecastLastUpdate) {
      this.setState({
        loading: false
      })
    }
  }

  fetchNewForecast = (oldLocation, oldLastUpdate) => {
    const { location, fetchWeather } = this.props
    const isLocationNotSame = this.checkIfSameLocation(oldLocation, location)
    const isForecastOutdated = this.checkIfForecastOutdated(oldLastUpdate)

    if (isLocationNotSame || isForecastOutdated) {
      fetchWeather()
    }
  }

  checkIfForecastOutdated = (forecastLastUpdate) => {
    return forecastLastUpdate + forecastAgeTimeout < Date.now()
  }

  checkIfSameLocation = (oldLocation, newLocation) => {
    return newLocation.lat !== oldLocation.lat || newLocation.lng !== oldLocation.lng
  }

  onRefresh = () => {
    this.setState({
      loading: true
    }, this.refreshForecast)
  }

  refreshForecast = () => {
    const { forecastLastUpdate, fetchLocation } = this.props
    const isForecastOutdated = this.checkIfForecastOutdated(forecastLastUpdate)

    if (isForecastOutdated) {
      fetchLocation()
    } else {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 300)
    }
  }

  render() {
    const { forecast, forecastLastUpdate } = this.props
    const { loading } = this.state

    return (
      <View style={styles.container}>
        <Header title="Weather at your location"/>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.onRefresh}
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
      </View>
    )
  }
}

App.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  forecast: PropTypes.object,
  forecastLastUpdate: PropTypes.number
}

export default App
