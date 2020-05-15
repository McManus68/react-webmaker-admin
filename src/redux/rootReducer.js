import { combineReducers } from 'redux'

import siteReducer from './site/siteReducer'
import configReducer from './config/configReducer'
import editorReducer from './editor/editorReducer'

const rootReducer = combineReducers({
  site: siteReducer,
  config: configReducer,
  editor: editorReducer,
})

export default rootReducer
