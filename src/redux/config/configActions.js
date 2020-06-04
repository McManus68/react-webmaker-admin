import axios from 'axios'

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

export const fetchConfigSectionRequest = () => {
  return {
    type: FETCH_CONFIG_SECTION_REQUEST,
  }
}

export const fetchConfigSectionSuccess = config => {
  return {
    type: FETCH_CONFIG_SECTION_SUCCESS,
    payload: config,
  }
}

export const fetchConfigSectionFailure = error => {
  return {
    type: FETCH_CONFIG_SECTION_FAILURE,
    payload: error,
  }
}

export const fetchConfigBlockRequest = () => {
  return {
    type: FETCH_CONFIG_BLOCK_REQUEST,
  }
}

export const fetchConfigBlockSuccess = config => {
  return {
    type: FETCH_CONFIG_BLOCK_SUCCESS,
    payload: config,
  }
}

export const fetchConfigBlockFailure = error => {
  return {
    type: FETCH_CONFIG_BLOCK_FAILURE,
    payload: error,
  }
}

export const fetchConfigAnimationRequest = () => {
  return {
    type: FETCH_CONFIG_ANIMATION_REQUEST,
  }
}

export const fetchConfigAnimationSuccess = config => {
  return {
    type: FETCH_CONFIG_ANIMATION_SUCCESS,
    payload: config,
  }
}

export const fetchConfigAnimationFailure = error => {
  return {
    type: FETCH_CONFIG_ANIMATION_FAILURE,
    payload: error,
  }
}

export const fetchConfigSection = () => {
  return dispatch => {
    dispatch(fetchConfigSectionRequest())
    axios
      .get('http://localhost:8080/api/config/sections')
      .then(response => {
        const config = response.data
        dispatch(fetchConfigSectionSuccess(config))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchConfigSectionFailure(errorMsg))
      })
  }
}

export const fetchConfigBlock = () => {
  return dispatch => {
    dispatch(fetchConfigBlockRequest())
    axios
      .get('http://localhost:8080/api/config/blocks')
      .then(response => {
        const config = response.data
        dispatch(fetchConfigBlockSuccess(config))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchConfigBlockFailure(errorMsg))
      })
  }
}

export const fetchConfigAnimation = () => {
  return dispatch => {
    dispatch(fetchConfigAnimationRequest())
    axios
      .get('http://localhost:8080/api/config/animations')
      .then(response => {
        const config = response.data
        dispatch(fetchConfigAnimationSuccess(config))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchConfigAnimationFailure(errorMsg))
      })
  }
}
