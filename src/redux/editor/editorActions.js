import { SAVE_EDITOR_PAGE, SET_EDITOR_SITE } from './editorTypes'

export const saveEditorPage = (page, pageIndex) => {
  return {
    type: SAVE_EDITOR_PAGE,
    payload: {
      page: page,
      pageIndex: pageIndex,
    },
  }
}

export const setEditorSite = site => {
  return {
    type: SET_EDITOR_SITE,
    payload: site,
  }
}
