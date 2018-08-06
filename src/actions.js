export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const SELECT_SUB = "SELECT_SUB"
export const INVALIDATE_SUB = "INVALIDATE_SUB"

/**
 * Update selected subreddit
 * @param {string} sub
 */
export const selectSub = sub => ({
  type: SELECT_SUB,
  sub
})

/**
 * Update didInvalidate so the subreddit may be refetched
 * @param {string} sub 
 */
export const invalidateSub = sub => ({
  type: INVALIDATE_SUB,
  sub
})

/**
 * Updates isFetching on the sub
 * @param {string} sub 
 */
export const requestPosts = sub => ({
  type: REQUEST_POSTS,
  sub
})

/**
 * Updates the sub posts/details
 * @param {string} sub 
 * @param {{data:{children:[{data:{}}]}}} json 
 */
const receivePosts = (sub, json) => ({
  type: RECEIVE_POSTS,
  sub,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

/**
 * Function to fetch posts and hadles dispatches
 * @param {string} sub 
 */
const fetchPosts = sub =>
  dispatch => {
    dispatch(requestPosts(sub))
    return fetch(`https://www.reddit.com/r/${sub}.json`)
    .then(res => res.json())
    .then(json => dispatch(receivePosts(sub, json)))
  }

/**
 * Determines if refetch is necessary
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

/**
 * Checks whether refetch is necessary before making a new http request
 * @param {string} sub
 * @return {Function} res
 */
export const fetchPostsIfNeeded = sub =>
  (dispatch, getState) =>
    shouldFetchPosts(getState(), sub) ?
      dispatch(fetchPosts(sub)) :
      Promise.resolve()