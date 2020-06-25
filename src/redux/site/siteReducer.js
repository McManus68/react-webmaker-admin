import {
  FETCH_SITES_SUCCESS,
  FETCH_SITES_REQUEST,
  FETCH_SITES_FAILURE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_REQUEST,
  FETCH_SITE_FAILURE,
  CREATE_SITE_SUCCESS,
  CREATE_SITE_REQUEST,
  CREATE_SITE_FAILURE,
  UPDATE_SITE_SUCCESS,
  UPDATE_SITE_REQUEST,
  UPDATE_SITE_FAILURE,
  REMOVE_SITE_SUCCESS,
  REMOVE_SITE_REQUEST,
  REMOVE_SITE_FAILURE,
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

    // CREATE SITE
    case CREATE_SITE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_SITE_SUCCESS:
      var newSites = [...state.sites]
      newSites.push(action.payload)
      return {
        ...state,
        sites: newSites,
        loading: false,
        error: '',
      }
    case CREATE_SITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // UPDATE SITE
    case UPDATE_SITE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_SITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case UPDATE_SITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // REMOVE SITE
    case REMOVE_SITE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_SITE_SUCCESS:
      var newSites = [...state.sites]
      newSites = newSites.filter(site => site.id !== action.payload)
      return {
        ...state,
        sites: newSites,
        loading: false,
        error: '',
      }
    case REMOVE_SITE_FAILURE:
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
