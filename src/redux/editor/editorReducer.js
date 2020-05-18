import { SAVE_EDITOR_PAGE, SET_EDITOR_SITE } from './editorTypes'

const initialState = {
  site: null,
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
        readyToPublish: false,
      }

    default:
      return state
  }
}

export default editorReducer
