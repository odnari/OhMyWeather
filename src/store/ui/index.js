import { getFullActionName } from '../../config'

const getUiFullActionName = getFullActionName('ui')

const SET_LOADING = getUiFullActionName('SET_LOADING')

export const ACTIONS = {
  SET_LOADING
}

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload
})

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
