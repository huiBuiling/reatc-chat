//合并所有reducers,并且返回

import { combineReducers } from 'redux'
import { chatUser } from './chat.redux'
import { user } from './user.redux'

export default combineReducers ({user , chatUser})
