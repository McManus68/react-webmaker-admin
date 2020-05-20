import {
  SAVE_CURRENT_PAGE,
  SET_EDITING_SITE,
  ADD_PAGE,
  SAVE_PAGE_REQUEST,
  SET_CURRENT_PAGE_INDEX,
} from './editorTypes'

const initialState = {
  site: { pages: [] },
  pageIndexToSave: -1,
  flagSaved: false,
  currentSiteId: '',
  currentPageIndex: 0,
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.pageIndex] = action.payload.page
      return {
        ...state,
        site: newSite,
        flagSaved: !state.flagSaved,
      }

    case SET_EDITING_SITE:
      return {
        ...state,
        site: action.payload,
        currentSiteId: action.payload && action.payload.id,
        currentPageIndex: 0,
      }

    case SET_CURRENT_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: action.payload,
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
        pageIndexToSave: action.payload,
        flagSaved: !state.flagSaved,
      }

    default:
      return state
  }
}

export default editorReducer
