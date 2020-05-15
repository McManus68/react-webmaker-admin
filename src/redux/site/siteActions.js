import axios from 'axios'

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

export const saveSiteRequest = () => {
  return {
    type: SAVE_SITE_REQUEST,
  }
}

export const saveSiteSuccess = site => {
  return {
    type: SAVE_SITE_SUCCESS,
    payload: site,
  }
}

export const saveSiteFailure = error => {
  return {
    type: SAVE_SITE_FAILURE,
    payload: error,
  }
}

export const fetchSites = () => {
  return dispatch => {
    dispatch(fetchSitesRequest())
    axios
      .get('http://localhost:8080/api/sites')
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
      .get('http://localhost:8080/api/sites/' + id)
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

export const saveSite = site => {
  return dispatch => {
    dispatch(saveSiteRequest())
    axios
      .post('http://localhost:8080/api/sites/', site)
      .then(response => {
        const site = response.data
        dispatch(saveSiteSuccess(site))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(saveSiteFailure(errorMsg))
      })
  }
}
