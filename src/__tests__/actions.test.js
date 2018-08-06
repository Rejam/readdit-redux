import { 
  REQUEST_POSTS,
  requestPosts
} from '../actions'

describe("actions", () => {
  it("creates an action to update isFetching", () => {
    const sub = 'reactjs'
    const expectedAction = {
      type: REQUEST_POSTS,
      sub
    }
    expect(requestPosts('reactjs')).toEqual(expectedAction)
  })
})