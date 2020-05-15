import {
  SAVE_EDITOR_PAGE,
  SET_EDITOR_SITE,
  SET_EDITOR_PAGE_INDEX,
} from './editorTypes'

const initialState = {
  site: null,
  page: null,
  pageIndex: 0,
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EDITOR_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.pageIndex] = action.payload.page
      return {
        ...state,
        site: newSite,
      }

    case SET_EDITOR_SITE:
      return {
        ...state,
        site: action.payload,
      }

    case SET_EDITOR_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      }

    default:
      return state
  }
}

export default editorReducer
