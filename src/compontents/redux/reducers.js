//合并所有reducers,并且返回
import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './auth.redux'

export default combineReducers ({counter, auth})