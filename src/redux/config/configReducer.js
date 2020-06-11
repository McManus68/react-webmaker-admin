import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
} from './configTypes'

const initialState = {
  loading: false,
  error: '',
  section: [],
  block: [],
  animation: [],
  nav: [],
  default: {},
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
        ...action.payload,
        loading: false,
        error: '',
      }
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        section: [],
        block: [],
        animation: [],
        nav: [],
        default: {},
      }
    default:
      return state
  }
}

export default configReducer
