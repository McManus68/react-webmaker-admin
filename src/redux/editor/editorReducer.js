import {
  SAVE_CURRENT_PAGE,
  SET_EDITING_SITE,
  ADD_PAGE,
  SAVE_PAGE_REQUEST,
  SET_CURRENT_PAGE_INDEX,
  SET_PENDING_ACTION,
} from './editorTypes'

const initialState = {
  site: { pages: [] },
  pageToSave: { index: -1 },
  flagSaved: false,
  currentSiteId: '',
  currentPageIndex: 0,
  pendingAction: '',
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.pageIndex] = action.payload.page
      return {
        ...state,
        site: newSite,
        flagSaved: true,
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

    case SET_PENDING_ACTION:
      return {
        ...state,
        pendingAction: action.payload,
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
        pageToSave: { index: action.payload },
        flagSaved: false,
      }

    default:
      return state
  }
}

export default editorReducer
