import axios from 'axios'

export const SELECT_SUB = "SELECT_SUB"
/**
 * Update selected subreddit
 * @param {string} sub
 */
export const selectSub = sub => ({
  type: SELECT_SUB,
  sub
})

export const INVALIDATE_SUB = "INVALIDATE_SUB"
/**
 * Update didInvalidate so the subreddit may be refetched
 * @param {string} sub 
 */
export const invalidateSub = sub => ({
  type: INVALIDATE_SUB,
  sub
})

export const REQUEST_POSTS = "REQUEST_POSTS"
/**
 * Updates isFetching on the sub
 * @param {string} sub 
 */
export const requestPosts = sub => ({
  type: REQUEST_POSTS,
  sub
})

export const RECEIVE_POSTS = "RECEIVE_POSTS"
/**
 * Updates the sub posts/details
 * @param {string} sub 
 * @param {{data:{data: {children:[{data:{}}]}}}} json 
 */
const receivePosts = (sub, json) => ({
  type: RECEIVE_POSTS,
  sub,
  posts:json.data.data.children.map(child => child.data),
  lastUpdated: Date.now()
})

/**
 * Function to fetch posts and hadles dispatches
 * @param {string} sub 
 */
export const fetchPosts = sub =>
  dispatch => {
    dispatch(requestPosts(sub))
    return axios(`https://www.reddit.com/r/${sub}.json`)
    .then(
      json => dispatch(receivePosts(sub, json)),
      err => console.error(err)
    )
  }

/**
 * Determines if necessary to make a new http request
 * @param {{postsBySub:{}}} state 
 * @param {string} sub 
 * @return {boolean}
 */
const shouldFetchPosts = (state, sub) => {
  const posts = state.postsBySub[sub]
  return !posts ?
    true :
    posts.isFetching ?
      false :
      posts.didInvalidate
}

export const fetchPostsIfNeeded = sub =>
  (dispatch, getState) =>
    shouldFetchPosts(getState(), sub) ?
      dispatch(fetchPosts(sub)) :
      Promise.resolve()