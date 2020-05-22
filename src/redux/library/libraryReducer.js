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

const initialState = {
  loading: false,
  images: [],
  uploadProgress: 0,
  error: '',
  selectedImage: {},
}

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
        error: '',
      }
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        images: [],
        error: action.payload,
      }
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        uploadProgress: 0,
      }
    case UPLOAD_IMAGE_SUCCESS:
      const newImages = [...state.images]
      newImages.push(action.payload)
      return {
        ...state,
        loading: false,
        error: '',
        uploadProgress: 0,
        images: newImages,
      }
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      }
    case SET_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: action.payload,
      }
    default:
      return state
  }
}

export default libraryReducer
