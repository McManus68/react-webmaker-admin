import { SAVE_CURRENT_PAGE, SET_EDITING_SITE, ADD_PAGE } from './editorTypes'

export const saveCurrentPage = (page, pageIndex) => {
  return {
    type: SAVE_CURRENT_PAGE,
    payload: {
      page: page,
      pageIndex: pageIndex,
    },
  }
}

export const setEditingSite = site => {
  return {
    type: SET_EDITING_SITE,
    payload: site,
  }
}

export const addPage = name => {
  return {
    type: ADD_PAGE,
    payload: name,
  }
}
