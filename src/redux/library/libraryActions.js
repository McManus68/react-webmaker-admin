import api from '../../utils/api'

import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  SET_UPLOAD_PROGRESS,
  SET_SELECTED_IMAGE,
} from './libraryTypes'

export const fetchImagesRequest = siteId => {
  return {
    type: FETCH_IMAGES_REQUEST,
    payload: siteId,
  }
}

export const fetchImagesSuccess = images => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: images,
  }
}

export const fetchImagesFailure = error => {
  return {
    type: FETCH_IMAGES_FAILURE,
    payload: error,
  }
}

export const uploadImageRequest = () => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
  }
}

export const uploadImageSuccess = image => {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: image,
  }
}

export const uploadImageFailure = error => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
  }
}

export const setUploadProgress = progress => {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  }
}

export const setSelectedImage = image => {
  return {
    type: SET_SELECTED_IMAGE,
    payload: image,
  }
}

export const uploadImage = (siteId, image) => {
  return dispatch => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        dispatch(setUploadProgress(percentCompleted))
      },
    }
    let fd = new FormData()
    fd.append('file', image)
    dispatch(uploadImageRequest())
    api
      .post(`images/upload/${siteId}`, fd, config)
      .then(response => {
        const image = response.data
        dispatch(uploadImageSuccess(image))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(uploadImageFailure(errorMsg))
      })
  }
}

export const fetchImages = siteId => {
  return dispatch => {
    dispatch(fetchImagesRequest())
    api
      .get(`images/${siteId}`)
      .then(response => {
        const images = response.data
        dispatch(fetchImagesSuccess(images))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchImagesFailure(errorMsg))
      })
  }
}
