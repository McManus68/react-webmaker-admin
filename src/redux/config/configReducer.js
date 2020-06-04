import {
  FETCH_CONFIG_SECTION_REQUEST,
  FETCH_CONFIG_SECTION_SUCCESS,
  FETCH_CONFIG_SECTION_FAILURE,
  FETCH_CONFIG_BLOCK_REQUEST,
  FETCH_CONFIG_BLOCK_SUCCESS,
  FETCH_CONFIG_BLOCK_FAILURE,
  FETCH_CONFIG_ANIMATION_REQUEST,
  FETCH_CONFIG_ANIMATION_SUCCESS,
  FETCH_CONFIG_ANIMATION_FAILURE,
} from './configTypes'

const initialState = {
  loading: false,
  section: {},
  block: {},
  error: '',
  animation: [],
}

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONFIG_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_CONFIG_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        section: action.payload,
        error: '',
      }
    case FETCH_CONFIG_SECTION_FAILURE:
      return {
        ...state,
        loading: false,
        section: {},
        error: action.payload,
      }
    case FETCH_CONFIG_BLOCK_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_CONFIG_BLOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        block: action.payload,
        error: '',
      }
    case FETCH_CONFIG_BLOCK_FAILURE:
      return {
        ...state,
        loading: false,
        block: {},
        error: action.payload,
      }
    case FETCH_CONFIG_ANIMATION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_CONFIG_ANIMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        animation: [''].concat(action.payload),
        error: '',
      }
    case FETCH_CONFIG_ANIMATION_FAILURE:
      return {
        ...state,
        loading: false,
        animation: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default configReducer
