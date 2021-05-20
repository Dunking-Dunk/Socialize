import React from 'react'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import './post.css'
import {deletePost,likePost } from '../../../actions/index'

const Post = (props) => {
    const { post } = props
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    if (props.post) {
        return (
            <div className="post" >
                <div className="post__container">
                    <div className="post__img">
                        <img src={!post.selectedFile ? 'https://media.musclegrid.io/agelesskarate.com/uploads/2017/04/26045848/default-image.jpg' : post.selectedFile} alt={post._id}/>
                        <h2>{post.name}</h2>
                        <p>{moment(post.createdAt).fromNow()}</p>
                        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&(
                            <div><Link className="post__img--editlink" to={`/edit/${post._id}`}>...</Link></div>)}
                    </div>
                    <div className="post__content">
                        <p>{post.tags.map((tag) => {
                            return `#${tag}`
                        })}</p>
                        <h2>{post.title}</h2>
                        <h4>{post.message}</h4>
                    </div>
                    <div className="post__buttons">
                        <button onClick={() => { dispatch(likePost(post._id)) }} disabled={!user?.result}><i class="fas fa-thumbs-up" ></i>Like {post.likes.length}</button>
                        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&(
                            <button onClick={() => { dispatch(deletePost(post._id)) }} disabled={!user?.result}><i class="fas fa-trash"></i>Delete</button>)}
                    </div>
                </div>
            </div>
               
) 
     } else {
        return <h1>...loading</h1>
     }
   
}

export default Post