import Posts from '../api/index'
import history from '../history'
Posts.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await Posts.get('/posts')
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    
    } catch (err) {
        console.log(err)
    }
}

export const createPosts = (post) => async (dispatch) => {
    try {
        const response = await Posts.post('/posts', post)
        dispatch({ type: 'CREATE_POST', payload: response.data })
        history.push('/')
    }
    catch (err) {
        console.log(err)
     }

}

export const editPosts = (id, post) => async (dispatch) => {
    try {
        const response = await Posts.patch(`/posts/${id}`, post)
        dispatch({ type: 'EDIT_POST', payload: response.data })
        history.push('/')
    } catch (err) {
        console.log(err)
    }
}

export const fetchPost = (id) => async (dispatch) => {
    try {
        const response = await Posts.get(`/posts/${id}`)
        dispatch({ type: 'FETCH_POST', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await Posts.delete(`/posts/${id}`)
        dispatch({ type: 'DELETE_POST', payload:id})
    } catch (err) {
        console.log(err)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await Posts.patch(`/posts/${id}/likePost`)
        dispatch({type:'UPDATE_LIKES', payload:data})
    } catch (err) {
        console.log(err)
    }
}