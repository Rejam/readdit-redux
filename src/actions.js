export const SELECT_SUB = "SELECT_SUB"
/**
 * Select a subreddit to view
 * @param {string} sub
 */
const selectSub = sub => ({
  type: SELECT_SUB,
  sub
})

export const INVALIDATE_SUB = "INVALIDATE_SUB"
/**
 * Invalidate the subreddit so it will be refetched
 * @param {string} sub 
 */
const invalidateSub = sub => ({
  type: INVALIDATE_SUB,
  sub
})

export const REQUEST_POSTS = "REQUEST_POSTS"
/**
 * Requesting posts
 * @param {string} sub 
 */
const requestPosts = sub => ({
  type: REQUEST_POSTS,
  sub
})

export const RECEIVE_POSTS = "RECEIVE_POSTS"
const receivePosts = (sub, json) => ({
  type: RECEIVE_POSTS,
  sub,
  posts: json.data.children.map(child => child.data),
  lastUpdated: Date.now()
})