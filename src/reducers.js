//合并所有reducers,并且返回
import { combineReducers } from 'redux'
// import { counter } from './redux/index.redux'
import { user } from './redux/user.redux'

export default combineReducers ({user})
