import {combineReducers} from 'redux'
import { userReducer } from './userReducer'

export const combinedRedusers = combineReducers({
  user: userReducer,
  /* notification: notificationReducer,
  filter: filterReducer */
})

