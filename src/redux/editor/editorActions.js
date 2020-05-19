import {
  SAVE_CURRENT_PAGE,
  SET_EDITING_SITE,
  ADD_PAGE,
  SAVE_PAGE_REQUEST,
} from './editorTypes'

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

export const saveCurrentPageRequest = index => {
  return {
    type: SAVE_PAGE_REQUEST,
    payload: index,
  }
}
