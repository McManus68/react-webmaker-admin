import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  SET_UPLOAD_PROGRESS,
} from './libraryTypes'

const initialState = {
  loading: false,
  imagesToUpload: {},
  uploadProgress: 0,
  error: '',
}

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        imagesToUpload: {},
        loading: true,
        uploadProgress: 0,
      }
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        imagesToUpload: {},
        error: '',
        uploadProgress: 0,
      }
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        imagesToUpload: {},
        error: action.payload,
      }
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      }
    default:
      return state
  }
}

export default libraryReducer
