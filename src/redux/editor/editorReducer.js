import {
  SAVE_CURRENT_PAGE,
  SET_EDITING_SITE,
  ADD_PAGE,
  SAVE_PAGE_REQUEST,
} from './editorTypes'

const initialState = {
  site: { pages: [] },
  previousPageIndex: -1,
  isCurrentPageSaved: false,
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.pageIndex] = action.payload.page
      return {
        ...state,
        site: newSite,
        isCurrentPageSaved: true,
      }

    case SET_EDITING_SITE:
      return {
        ...state,
        site: action.payload,
      }

    case ADD_PAGE:
      var newSite = { ...state.site }
      newSite.pages.push({ title: action.payload })
      return {
        ...state,
        site: newSite,
      }

    case SAVE_PAGE_REQUEST:
      return {
        ...state,
        previousPageIndex: action.payload,
        isCurrentPageSaved: false,
      }

    default:
      return state
  }
}

export default editorReducer
