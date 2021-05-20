import Posts from '../api/index'
import history from '../history'

export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await Posts.post('/users/signin', formData)
        dispatch({ type: 'AUTH', data })
        history.push('/')
    } catch (err) {
        console.log(err)
        dispatch({type: 'SIGN_IN_ERROR', payload: err.response.data.message})
    }
}
export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await Posts.post('/users/signup', formData)
        dispatch({type:'AUTH',data})
        history.push('/auth')
    } catch (err) {
        console.log(err)
    }
}