import { getFullActionName } from '../../config'

const getUiFullActionName = getFullActionName('weather')

const FETCH_WEATHER = getUiFullActionName('FETCH_WEATHER')
const FETCH_WEATHER_SUCCESS = getUiFullActionName('FETCH_WEATHER_SUCCESS')
const FETCH_WEATHER_ERROR = getUiFullActionName('FETCH_WEATHER_ERROR')

export const ACTIONS = {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
}

export const fetchWeather = () => ({
  type: FETCH_WEATHER
})

export const fetchWeatherSuccess = (payload) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload
})

export const fetchWeatherError = (error) => ({
  type: FETCH_WEATHER_ERROR,
  error
})

const initialState = {
  data: {},
  lastUpdate: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        lastUpdate: Date.now()
      }
    default:
      return state
  }
}
