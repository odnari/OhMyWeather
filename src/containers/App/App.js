import React, { Component } from 'react'
import { fetchLocation } from '../../utils/geolocation'
import { StyleSheet, Text, View, Alert } from 'react-native'

const errorMessages = {
  geolocation: {
    title: 'Geolocation Permissions',
    message: 'We need permissions to your location to provide weather information. Please, enable it in Settings.'
  }
}

export default class App extends Component {
  state = {
    location: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.setState({
      loading: true
    }, this.getLocation)
  }

  getLocation = () => {
    fetchLocation()
      .then(this.setLocation)
      .catch(this.locationError)
  }

  locationError = () => {
    this.setState({
      error: true
    }, () => Alert.alert(errorMessages.geolocation.title, errorMessages.geolocation.message))
  }

  setLocation = (location) => {
    this.setState({
      location,
      loading: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Weather at your location!</Text>
        {
          this.state.location &&
          <Text>
            <Text>Lat: {this.state.location.lat}</Text>
            <Text>{'\n'}</Text>
            <Text>Lng: {this.state.location.lng}</Text>
          </Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
