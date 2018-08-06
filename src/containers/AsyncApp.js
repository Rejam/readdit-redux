import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSub,
  fetchPostsIfNeeded,
  invalidateSub
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends React.Component {
  componentDidMount() {
    const { dispatch, selectedSub } = this.props
    dispatch(fetchPostsIfNeeded(selectedSub))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, selectedSub } = this.props
    if (selectedSub !== prevProps.selectedSub) {
      dispatch(fetchPostsIfNeeded(selectedSub))
    }
  }

  handleChange = nextSub => {
    this.props.dispatch(selectSub(nextSub))
    this.props.dispatch(fetchPostsIfNeeded(nextSub))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedSub } = this.props
    dispatch(invalidateSub(selectedSub))
    dispatch(fetchPostsIfNeeded(selectedSub))
  }

  render() {
    const { selectedSub, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker 
          value={selectedSub}
          onChange={this.handleChange}
          options={['unitedkingdom', 'reactjs']}  
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>No posts available in {selectedSub}</h2> }
        {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1}}>
          <Posts posts={posts} />
        </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSub: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { selectedSub, postsBySub } = state
  const {
    isFetching,
    lastUpdated,
    items,
  } = postsBySub[selectedSub] || {
    isFetching: true,
    items: []
  }
  console.log(postsBySub[selectedSub])
  return {
    selectedSub,
    posts: items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
