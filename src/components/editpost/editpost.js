import React from 'react'
import { connect } from 'react-redux'
import { editPosts, fetchPost } from '../../actions/index'
import _ from 'lodash'

import Form from '../Form/form'
import './editpost.css'


 
class EditPost extends React.Component{
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }
    onSubmit = (value, selectedFile) => {
        value.selectedFile = selectedFile
        this.props.editPosts(this.props.match.params.id, value)
    }
    render() {
        console.log(this.props.post)
        return (
            <div className="editpost">
                <div className="editpost__container">
                    <h1>Edit Post</h1>
                    <Form onSubmit={this.onSubmit} initialValues={_.pick(this.props.post, ['message', 'title', 'tags'])} selectedFile={this.props.post.selectedFile}/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProp = (state, ownProps) => {
    const id = ownProps.match.params.id
    return {
        post: state.posts.filter((post) => post._id === id)[0]
    }
}

export default connect(mapStateToProp, {editPosts,fetchPost})(EditPost)