import { combineReducers } from 'redux'

import siteReducer from './site/siteReducer'

const rootReducer = combineReducers({
  site: siteReducer,
})

export default rootReducer
