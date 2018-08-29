import { getFullActionName } from '../../config'

const getUiFullActionName = getFullActionName('location')

const FETCH_LOCATION = getUiFullActionName('FETCH_LOCATION')
const FETCH_LOCATION_SUCCESS = getUiFullActionName('FETCH_LOCATION_SUCCESS')
const FETCH_LOCATION_ERROR = getUiFullActionName('FETCH_LOCATION_ERROR')

export const ACTIONS = {
  FETCH_LOCATION,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ERROR
}

export const fetchLocation = () => ({
  type: FETCH_LOCATION
})

export const fetchLocationSuccess = (payload) => ({
  type: FETCH_LOCATION_SUCCESS,
  payload
})

export const fetchLocationError = (error) => ({
  type: FETCH_LOCATION_ERROR,
  error
})

const initialState = {
  lat: null,
  lng: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
