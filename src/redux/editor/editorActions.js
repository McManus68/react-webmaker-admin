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

export const saveHeader = header => {
  return {
    type: SAVE_HEADER,
    payload: header,
  }
}

export const saveTheme = theme => {
  return {
    type: SAVE_THEME,
    payload: theme,
  }
}

export const setSite = site => {
  return {
    type: SET_SITE,
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
