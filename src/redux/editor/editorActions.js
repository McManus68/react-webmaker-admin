import {
  SET_ACTIVE_INDEX,
  ADD_SECTION,
  SET_SECTION,
  REMOVE_SECTION,
  ADD_ROW,
  REMOVE_ROW,
  SAVE_PAGE_INFO,
  SAVE_SITE_INFO,
  SAVE_FOOTER,
  SAVE_HEADER,
  SAVE_THEME,
  SET_SITE,
  ADD_PAGE,
  SAVE_PARAMS,
} from './editorTypes'

export const addSection = (path, index) => {
  return {
    type: ADD_SECTION,
    payload: {
      path: path,
      index: index,
    },
  }
}

export const setSection = (path, index, section) => {
  return {
    type: SET_SECTION,
    payload: {
      path: path,
      index: index,
      section: section,
    },
  }
}

export const removeSection = (path, index) => {
  return {
    type: REMOVE_SECTION,
    payload: {
      path: path,
      index: index,
    },
  }
}

export const addRow = (path, index) => {
  return {
    type: ADD_ROW,
    payload: {
      path: path,
      index: index,
    },
  }
}

export const removeRow = (path, index) => {
  return {
    type: REMOVE_ROW,
    payload: {
      path: path,
      index: index,
    },
  }
}

export const savePageInfo = (path, page) => {
  return {
    type: SAVE_PAGE_INFO,
    payload: {
      path: path,
      page: page,
    },
  }
}

export const saveSiteInfo = site => {
  return {
    type: SAVE_SITE_INFO,
    payload: site,
  }
}

export const saveParams = (path, params) => {
  return {
    type: SAVE_PARAMS,
    payload: {
      path: path,
      params: params,
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

export const addPage = name => {
  return {
    type: ADD_PAGE,
    payload: name,
  }
}

export const setActiveIndex = index => {
  return {
    type: SET_ACTIVE_INDEX,
    payload: index,
  }
}
