import axios from 'axios'

import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  SET_UPLOAD_PROGRESS,
} from './libraryTypes'

export const setUploadProgress = progress => {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: progress,
  }
}

export const uploadImageRequest = (siteId, image) => {
  return {
    type: UPLOAD_IMAGE_REQUEST,
    payload: { siteId: siteId, image: image },
  }
}

export const uploadImageSuccess = () => {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
  }
}

export const uploadImageFailure = error => {
  return {
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
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
    dispatch(uploadImageRequest(siteId, image))
    axios
      .post(`http://localhost:8080/api/images/upload/${siteId}`, fd, config)
      .then(response => {
        const config = response.data
        dispatch(uploadImageSuccess(config))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(uploadImageFailure(errorMsg))
      })
  }
}
