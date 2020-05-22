import { combineReducers } from 'redux'

import siteReducer from './site/siteReducer'
import configReducer from './config/configReducer'
import editorReducer from './editor/editorReducer'
import libraryReducer from './library/libraryReducer'

const rootReducer = combineReducers({
  site: siteReducer,
  config: configReducer,
  editor: editorReducer,
  library: libraryReducer,
})

export default rootReducer
