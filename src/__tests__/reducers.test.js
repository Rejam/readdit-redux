import { selectedSub } from '../reducers'
import { 
  SELECT_SUB,
} from '../actions'

describe("selectedSub Reducer", () => {
  it("returns current state", () => {
    const action = {}
    const state = "reactjs"
    expect(selectedSub(state, action)).toEqual(state)
  })

  it("updates state", () => {
    const action = {
      type: SELECT_SUB, 
      sub: "reactjs"
    }
    const expectedState = "reactjs"
    expect(selectedSub("", action)).toEqual(expectedState)
  })
})
