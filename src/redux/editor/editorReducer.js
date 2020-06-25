import { get, set } from 'lodash'

import {
  ADD_SECTION,
  SET_SECTION,
  REMOVE_SECTION,
  ADD_ROW,
  REMOVE_ROW,
  ADD_BLOCK,
  REMOVE_BLOCK,
  SAVE_PAGE_INFO,
  SAVE_SITE_INFO,
  SAVE_FOOTER,
  SAVE_HEADER,
  SAVE_THEME,
  SET_SITE,
  ADD_PAGE,
  REMOVE_PAGE,
  SET_ACTIVE_INDEX,
  SAVE_PARAMS,
} from './editorTypes'

const initialState = {
  site: { pages: [] },
  currentSiteId: '',
  activeIndex: 0,
}

const getDefaultParams = (config, type) => {
  return config
    .find(item => item.type === type)
    .params.map(item => ({
      name: item.name,
      type: item.type,
      value: item.defaultValue,
    }))
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

    case REMOVE_PAGE:
      var newSite = { ...state.site }
      newSite.pages.splice(action.payload, 1)
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
      var { path, index, section } = { ...action.payload }
      var sections = get(newSite, path, [])
      sections[index] = section
      set(newSite, path, sections)
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

    case ADD_BLOCK:
      var newSite = { ...state.site }
      var { path, block } = { ...action.payload }
      var blocks = get(newSite, path, [])
      blocks.push(block)
      blocks.forEach(block => {
        block.responsive.md = 12 / blocks.length
        block.responsive.lg = 12 / blocks.length
        block.responsive.xl = 12 / blocks.length
      })
      set(newSite, path, blocks)
      return {
        ...state,
        site: newSite,
      }

    case REMOVE_BLOCK:
      var newSite = { ...state.site }
      var blocks = get(newSite, action.payload.path, [])
      blocks.splice(action.payload.index, 1)
      blocks.forEach(block => {
        block.responsive.md = 12 / blocks.length
        block.responsive.lg = 12 / blocks.length
        block.responsive.xl = 12 / blocks.length
      })
      set(newSite, action.payload.path, blocks)
      return {
        ...state,
        site: newSite,
      }

    case SAVE_PARAMS:
      var newSite = { ...state.site }
      var { path, values } = { ...action.payload }
      var { params, responsive, animation } = { ...values }
      var newParams = get(newSite, `${path}.params`, [])
      newParams.forEach((param, i) => (param.value = params[i].value))
      set(newSite, `${path}.params`, newParams)
      if (responsive) set(newSite, `${path}.responsive`, responsive)
      if (animation) set(newSite, `${path}.animation`, animation)
      return {
        ...state,
        site: newSite,
      }

    default:
      return state
  }
}

export default editorReducer
