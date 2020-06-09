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
        error: '',
        section: action.payload.section,
        block: action.payload.block,
        animation: action.payload.animation,
        nav: action.payload.nav,
      }
    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        section: {},
        block: {},
        animation: {},
        nav: {},
      }
    default:
      return state
  }
}

export default configReducer
