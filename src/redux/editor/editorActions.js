import {
  SAVE_PAGE,
  SAVE_FOOTER,
  SET_EDITING_SITE,
  ADD_PAGE,
  SAVE_TAB_REQUEST,
  SET_ACTIVE_INDEX,
  SET_PENDING_ACTION,
} from './editorTypes'

export const savePage = (page, index) => {
  return {
    type: SAVE_PAGE,
    payload: {
      page: page,
      index: index,
    },
  }
}

export const saveFooter = footer => {
  return {
    type: SAVE_FOOTER,
    payload: footer,
  }
}

export const setEditingSite = site => {
  return {
    type: SET_EDITING_SITE,
    payload: site,
  }
}

export const setPendingAction = action => {
  return {
    type: SET_PENDING_ACTION,
    payload: action,
  }
}

export const addPage = name => {
  return {
    type: ADD_PAGE,
    payload: name,
  }
}

export const saveActiveTabRequest = index => {
  return {
    type: SAVE_TAB_REQUEST,
    payload: index,
  }
}

export const setActiveIndex = index => {
  return {
    type: SET_ACTIVE_INDEX,
    payload: index,
  }
}
