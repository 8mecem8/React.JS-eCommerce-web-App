import {combineReducers} from 'redux'
import { userReducer } from './userReducer'
import {searchReducer} from './searchReducer'
import { cartReducer } from './cartReducer'
import { cartDrawerReducer } from './cartDrawerReducer'

export const combinedRedusers = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  cartDrawer : cartDrawerReducer,
})

