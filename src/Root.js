import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import AsyncApp from './containers/AsyncApp';
import { selectSub, fetchPostsIfNeeded } from "./actions";

const store = configureStore()
const DEFAULT_SUB = 'unitedkingdom'
store.dispatch(selectSub(DEFAULT_SUB))
store
  .dispatch(fetchPostsIfNeeded(DEFAULT_SUB))
  .then(() => console.log(store.getState()))

const Root = () =>
  <Provider store={store}>
    <AsyncApp />
  </Provider>

export default Root