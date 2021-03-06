import {
  SAVE_PAGE,
  SAVE_FOOTER,
  SAVE_HEADER,
  SAVE_THEME,
  SET_SITE,
  ADD_PAGE,
  SAVE_TAB_REQUEST,
  SET_ACTIVE_INDEX,
  SET_PENDING_ACTION,
} from './editorTypes'

const initialState = {
  site: { pages: [], footer: {} },
  tabIndexToSave: { index: -1 },
  flagSaved: false,
  currentSiteId: '',
  activeIndex: 0,
  pendingAction: '',
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.index] = action.payload.page
      return {
        ...state,
        site: newSite,
        flagSaved: true,
      }

    case SAVE_FOOTER:
      var newSite = { ...state.site }
      newSite.footer = action.payload
      return {
        ...state,
        site: newSite,
        flagSaved: true,
      }

    case SAVE_THEME:
      var newSite = { ...state.site }
      newSite.theme = action.payload
      return {
        ...state,
        site: newSite,
        flagSaved: true,
      }

    case SAVE_HEADER:
      var newSite = { ...state.site }
      newSite.header = action.payload
      return {
        ...state,
        site: newSite,
        flagSaved: true,
      }

    case SET_SITE:
      return {
        ...state,
        site: action.payload,
        currentSiteId: action.payload && action.payload.id,
        activeIndex: 0,
      }

    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.payload,
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

    case SAVE_TAB_REQUEST:
      return {
        ...state,
        tabIndexToSave: { index: action.payload },
        flagSaved: false,
      }

    default:
      return state
  }
}

export default editorReducer
