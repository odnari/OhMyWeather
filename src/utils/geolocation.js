import { PermissionsAndroid, Geoloca } from 'react-native'

const defaultGeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 60 * 60 * 1000
  }

const permissionRequestDialog = {
  'title': 'Geolocation Permission',
  'message': 'Allow us to use your location to provide weather information.'
}

export const requestPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    permissionRequestDialog
  )
    .then(granted => granted === PermissionsAndroid.RESULTS.GRANTED)
}

export const checkPermission = () => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(granted => granted === PermissionsAndroid.RESULTS.GRANTED)
}

export const getLocation = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      error => reject(error),
      {
        ...defaultGeolocationOptions,
        ...options
      }
    )
  })
}
