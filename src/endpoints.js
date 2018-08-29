const openWeatherApiKey = '9d9586a66f78e649880912e9a0848b04'
const openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5'

export const endpoints = {
  openweather: {
    currentWeather: {
      byLatLng: (lat, lng) => `${openWeatherApiUrl}/weather?lat=${lat}&lon=${lng}&appid=${openWeatherApiKey}&units=metric`
    }
  }
}

