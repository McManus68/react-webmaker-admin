import { combineReducers } from 'redux'

import siteReducer from './site/siteReducer'
import configReducer from './config/configReducer'
import editorReducer from './editor/editorReducer'
import libraryReducer from './library/libraryReducer'
import contextReducer from './context/contextReducer'

const rootReducer = combineReducers({
  site: siteReducer,
  config: configReducer,
  editor: editorReducer,
  library: libraryReducer,
  context: contextReducer,
})

export default rootReducer
