import axios from 'axios'

import { FETCH_CONFIG_REQUEST, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_FAILURE } from './configTypes'

export const fetchConfigRequest = () => {
  return {
    type: FETCH_CONFIG_REQUEST,
  }
}

export const fetchConfigSuccess = config => {
  return {
    type: FETCH_CONFIG_SUCCESS,
    payload: config,
  }
}

export const fetchConfigFailure = error => {
  return {
    type: FETCH_CONFIG_FAILURE,
    payload: error,
  }
}

export const fetchConfig = () => {
  return dispatch => {
    dispatch(fetchConfigRequest())
    axios
      .get(`${process.env.REACT_APP_API_URL}/config`)
      .then(response => {
        const config = response.data
        dispatch(fetchConfigSuccess(config))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchConfigFailure(errorMsg))
      })
  }
}
