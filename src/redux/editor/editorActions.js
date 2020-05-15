import {
  SAVE_EDITOR_PAGE,
  SET_EDITOR_SITE,
  SET_EDITOR_PAGE_INDEX,
} from './editorTypes'

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

export const setEditorPageIndex = index => {
  return {
    type: SET_EDITOR_PAGE_INDEX,
    payload: index,
  }
}
