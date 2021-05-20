import React from 'react'
import { connect } from 'react-redux'
import {createPosts} from '../../actions/index'

import Form from '../Form/form'
import './createpost.css'

class Createpost extends React.Component {
    constructor() {
        super()
        this.user = JSON.parse(localStorage.getItem('profile'))
    }
    
    onSubmit = (value, selectedFile) => {
        this.props.createPosts({ ...value, name: this.user?.result?.name, selectedFile: selectedFile })
    }

    render() {
        return (
            <div className="createpost">
                <div className="createpost__container">
                    <h1>Create Post</h1>
                    <Form onSubmit={this.onSubmit}/>
                </div>
          </div> 
            
        )
    }
}

const mapStateToProp = (state) => {
    return {post: state.posts}
}

export default connect(mapStateToProp, {createPosts})(Createpost)