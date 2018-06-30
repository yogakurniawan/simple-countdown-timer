import { combineReducers } from 'redux'

import countdown from './countdown'
import loading from './loadingReducer'
import error from './errorReducer'

export default combineReducers({
  countdown,
  loading,
  error
})
