import {
  FETCH_SITES_SUCCESS,
  FETCH_SITES_REQUEST,
  FETCH_SITES_FAILURE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_REQUEST,
  FETCH_SITE_FAILURE,
  SAVE_SITE_SUCCESS,
  SAVE_SITE_REQUEST,
  SAVE_SITE_FAILURE,
} from './siteTypes'

const initialState = {
  loading: false,
  sites: [],
  site: null,
  error: '',
}

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    // ALL SITES
    case FETCH_SITES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        loading: false,
        sites: action.payload,
        error: '',
      }
    case FETCH_SITES_FAILURE:
      return {
        ...state,
        loading: false,
        sites: [],
        error: action.payload,
      }

    // ONLY ONE SITE
    case FETCH_SITE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_SITE_SUCCESS:
      return {
        ...state,
        loading: false,
        site: action.payload,
        error: '',
      }
    case FETCH_SITE_FAILURE:
      return {
        ...state,
        loading: false,
        site: {},
        error: action.payload,
      }

    // SAVE SITE
    case SAVE_SITE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SAVE_SITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case SAVE_SITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default siteReducer
