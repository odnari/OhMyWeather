import { PermissionsAndroid, Platform } from 'react-native'

const defaultGeolocationOptions = {
    enableHighAccuracy: false,
    timeout: 5000
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
    .then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        throw new Error('Geolocation permission denied')
      }
    })
}

export const checkPermission = () => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(granted => {
      if (granted) {
        return true
      } else {
        throw new Error('Geolocation permission denied')
      }
    })
}

export const getLocation = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
      error => reject(error),
      {
        ...defaultGeolocationOptions,
        ...options
      }
    )
  })
}

export const fetchLocation = (options) => {
  if (Platform.OS === 'android') {
    return checkPermission()
      .catch(() => requestPermission())
      .then(() => getLocation(options))
  } else {
    return getLocation(options)
  }
}
