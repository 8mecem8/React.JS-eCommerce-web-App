import {combineReducers} from 'redux'
import { userReducer } from './userReducer'
import {searchReducer} from './searchReducer'

export const combinedRedusers = combineReducers({
  user: userReducer,
  search: searchReducer,
})

