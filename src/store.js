import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { selectedSub, postsBySub } from './reducers'

const logger = createLogger()

const rootReducer = combineReducers({
  selectedSub,
  postsBySub
})

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk,
      logger
    )
  )

export default configureStore