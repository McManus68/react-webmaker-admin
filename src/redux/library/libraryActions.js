import axios from 'axios'

import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  SET_UPLOAD_PROGRESS,
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

export const uploadImage = (siteId, image) => {
  return dispatch => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        dispatch(setUploadProgress(percentCompleted))
      },
    }
    let fd = new FormData()
    fd.append('file', image)
    dispatch(uploadImageRequest())
    axios
      .post(`http://localhost:8080/api/images/upload/${siteId}`, fd, config)
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
    axios
      .get(`http://localhost:8080/api/images/${siteId}`)
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
