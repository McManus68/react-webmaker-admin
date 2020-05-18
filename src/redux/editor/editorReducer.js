import { SAVE_CURRENT_PAGE, SET_EDITING_SITE, ADD_PAGE } from './editorTypes'

const initialState = {
  site: { pages: [] },
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_PAGE:
      var newSite = { ...state.site }
      newSite.pages[action.payload.pageIndex] = action.payload.page
      return {
        ...state,
        site: newSite,
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

    default:
      return state
  }
}

export default editorReducer
