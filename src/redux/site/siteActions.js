import axios from 'axios'

import {
  FETCH_SITES_SUCCESS,
  FETCH_SITES_REQUEST,
  FETCH_SITES_FAILURE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_REQUEST,
  FETCH_SITE_FAILURE,
  UPDATE_SITE_SUCCESS,
  UPDATE_SITE_REQUEST,
  UPDATE_SITE_FAILURE,
  CREATE_SITE_SUCCESS,
  CREATE_SITE_REQUEST,
  CREATE_SITE_FAILURE,
} from './siteTypes'

export const fetchSitesRequest = () => {
  return {
    type: FETCH_SITES_REQUEST,
  }
}

export const fetchSitesSuccess = sites => {
  return {
    type: FETCH_SITES_SUCCESS,
    payload: sites,
  }
}

export const fetchSitesFailure = error => {
  return {
    type: FETCH_SITES_FAILURE,
    payload: error,
  }
}

export const fetchSiteRequest = () => {
  return {
    type: FETCH_SITE_REQUEST,
  }
}

export const fetchSiteSuccess = site => {
  return {
    type: FETCH_SITE_SUCCESS,
    payload: site,
  }
}

export const fetchSiteFailure = error => {
  return {
    type: FETCH_SITE_FAILURE,
    payload: error,
  }
}

export const createSiteRequest = () => {
  return {
    type: CREATE_SITE_REQUEST,
  }
}

export const createSiteSuccess = site => {
  return {
    type: CREATE_SITE_SUCCESS,
    payload: site,
  }
}

export const createSiteFailure = error => {
  return {
    type: CREATE_SITE_FAILURE,
    payload: error,
  }
}

export const updateSiteRequest = () => {
  return {
    type: UPDATE_SITE_REQUEST,
  }
}

export const updateSiteSuccess = site => {
  return {
    type: UPDATE_SITE_SUCCESS,
    payload: site,
  }
}

export const updateSiteFailure = error => {
  return {
    type: UPDATE_SITE_FAILURE,
    payload: error,
  }
}

export const fetchSites = () => {
  return dispatch => {
    dispatch(fetchSitesRequest())
    axios
      .get(`${process.env.REACT_APP_API_URL}/sites`)
      .then(response => {
        const sites = response.data
        dispatch(fetchSitesSuccess(sites))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchSitesFailure(errorMsg))
      })
  }
}

export const fetchSite = id => {
  return dispatch => {
    dispatch(fetchSiteRequest())
    axios
      .get(`${process.env.REACT_APP_API_URL}/sites/${id}`)
      .then(response => {
        const site = response.data
        dispatch(fetchSiteSuccess(site))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchSiteFailure(errorMsg))
      })
  }
}

export const createSite = site => {
  return dispatch => {
    dispatch(createSiteRequest())
    axios
      .post(`${process.env.REACT_APP_API_URL}/sites/`, site)
      .then(response => {
        const site = response.data
        dispatch(createSiteSuccess(site))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(createSiteFailure(errorMsg))
      })
  }
}

export const updateSite = site => {
  return dispatch => {
    dispatch(updateSiteRequest())
    axios
      .post(`${process.env.REACT_APP_API_URL}/sites/`, site)
      .then(response => {
        const site = response.data
        dispatch(updateSiteSuccess(site))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(updateSiteFailure(errorMsg))
      })
  }
}
