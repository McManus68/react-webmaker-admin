import { get, set } from 'lodash'
import {
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
  SET_ACTIVE_INDEX,
  SAVE_PARAMS,
} from './editorTypes'

const initialState = {
  site: { pages: [] },
  currentSiteId: '',
  activeIndex: 0,
}

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PAGE_INFO:
      var newSite = { ...state.site }
      var page = get(newSite, action.payload.path)
      set(newSite, action.payload.path, { ...page, ...action.payload.page })
      return {
        ...state,
        site: newSite,
      }

    case SAVE_SITE_INFO:
      var newSite = { ...state.site, ...action.payload }
      return {
        ...state,
        site: newSite,
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
      }

    case SAVE_HEADER:
      var newSite = { ...state.site }
      newSite.header = action.payload
      return {
        ...state,
        site: newSite,
      }

    case SET_SITE:
      return {
        ...state,
        site: action.payload,
        currentSiteId: action.payload && action.payload.id,
        activeIndex: 0,
      }

    case ADD_PAGE:
      var newSite = { ...state.site }
      newSite.pages.push({ title: action.payload })
      return {
        ...state,
        site: newSite,
      }

    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.payload,
      }

    case ADD_SECTION:
      var newSite = { ...state.site }
      var sections = get(newSite, action.payload.path, [])
      sections.splice(action.payload.index, 0, { rows: [], params: [] })
      set(newSite, action.payload.path, sections)
      return {
        ...state,
        site: newSite,
      }

    case SET_SECTION:
      var newSite = { ...state.site }
      var sections = get(newSite, action.payload.path, [])
      sections[action.payload.index] = action.payload.section
      set(newSite, action.payload.path, sections)
      return {
        ...state,
        site: newSite,
      }

    case REMOVE_SECTION:
      var newSite = { ...state.site }
      var sections = get(newSite, action.payload.path, [])
      sections.splice(action.payload.index, 1)
      set(newSite, action.payload.path, sections)
      return {
        ...state,
        site: newSite,
      }

    case ADD_ROW:
      var newSite = { ...state.site }
      var rows = get(newSite, action.payload.path, [])
      rows.splice(action.payload.index, 0, { blocks: [] })
      set(newSite, action.payload.path, rows)
      return {
        ...state,
        site: newSite,
      }

    case REMOVE_ROW:
      var newSite = { ...state.site }
      var rows = get(newSite, action.payload.path, [])
      rows.splice(action.payload.index, 1)
      set(newSite, action.payload.path, rows)
      return {
        ...state,
        site: newSite,
      }

    case SAVE_PARAMS:
      var newSite = { ...state.site }
      console.log('action.payload', action.payload)
      var params = get(newSite, action.payload.path, [])
      params.forEach((param, i) => (param.value = action.payload.params[i].value))
      set(newSite, action.payload.path, params)
      return {
        ...state,
        site: newSite,
      }

    default:
      return state
  }
}

export default editorReducer
