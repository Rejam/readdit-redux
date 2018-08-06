import { combineReducers } from "../node_modules/redux";
import { 
  SELECT_SUB, 
  INVALIDATE_SUB, 
  REQUEST_POSTS, 
  RECEIVE_POSTS
} from "./actions";

const selectedSub = (state = "", action) => {
  switch(action.type) {
    case SELECT_SUB:
      return action.sub
    default:
      return state
  }
}

const sub = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, 
  action
) => {
  switch(action.type) {
    case INVALIDATE_SUB:
      return {
        ...state,
        didInvalidate: true 
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        didInvalidate: false,
        isFetching: false,
        lastUpdated: action.receivedAt,
        items: action.posts
      }
    default:
      return state
  }
}

const postsBySub = (state = {}, action) => {
  switch(action.type) {
    case INVALIDATE_SUB:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.sub]: sub(state[action.sub], action)
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