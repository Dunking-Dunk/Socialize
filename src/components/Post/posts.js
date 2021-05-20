import React from 'react'
import { connect } from 'react-redux'
import {fetchPosts} from '../../actions/index'
import Post from './post/post'

import './posts.css'


class Posts extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        const renderPost = this.props.posts.map((post) => {
            return (
                <Post  post={post} key={post._id} />)
        })
        
        if (!this.props.posts) {
            return <h1 className="posts__loading">Loading..</h1>
        } else {
            return (
                <div className="posts">
                    <div className="posts__container">
                        {renderPost}
                    </div>
            </div>
        )    
        }
      
    }
}

const mapStateToProp = (state) => {
    return {posts: state.posts}
}

export default connect(mapStateToProp, {fetchPosts})(Posts)