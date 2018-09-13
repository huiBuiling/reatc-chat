//合并所有reducers,并且返回

import { combineReducers } from 'redux'
import { user } from './user.redux'
import { chatUser } from './chat.user.redux'
import { chat } from './chat.redux'

export default combineReducers ({user , chatUser, chat})
