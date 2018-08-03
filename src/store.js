import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { selectSub, fetchPostsIfNeeded } from "./actions";
import rootReducer from './reducers'

const logger = createLogger()

const store = createStore(
  rootReducer, 
  applyMiddleware(
    thunk,
    logger
  )
)

const DEFAULT_SUB = 'unitedkingdom'
store.dispatch(selectSub(DEFAULT_SUB))
store
  .dispatch(fetchPostsIfNeeded(DEFAULT_SUB))
  .then(() => console.log(store.getState()))
  
export default store