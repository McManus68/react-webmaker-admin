import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
} from './configTypes'

const initialState = {
  loading: false,
  config: {},
  error: '',
}

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONFIG_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        config: action.payload,
        error: '',
      }
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        config: {},
        error: action.payload,
      }
    default:
      return state
  }
}

export default configReducer
