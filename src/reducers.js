import { combineReducers } from "../node_modules/redux";
import { SELECT_SUB, INVALIDATE_SUB, REQUEST_POSTS, RECEIVE_POSTS } from "./actions";

const selectedSub = (state = 'popular', action) => {
  switch(action.type) {
    case SELECT_SUB:
      return action.sub
    default:
      return state
  }
}

const postsBySub = (state = {}, action) => {
  switch(action.type) {
    case INVALIDATE_SUB:
      return {
        ...state,
        [action.sub]: {
          didInvalidate: true
        }
      }
    case REQUEST_POSTS:
      return {
        ...state, 
        [action.sub]: {
          isFetching: true,
          didInvalidate: false
        }
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.sub]: {
          isFetching: false,
          didInvalidate: false,
          lastUpdated: action.lastUpdated,
          items: action.posts
        }
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedSub,
  postsBySub
})
export default rootReducer