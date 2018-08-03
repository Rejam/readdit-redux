import { combineReducers } from "../node_modules/redux";

const subReducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

const postsReducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedSub: subReducer,
  postsBySub: postsReducer
})
export default rootReducer