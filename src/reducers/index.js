import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import postReducer from './posts'
import authReducers from './auth'
import errorReducer from './error'

export default combineReducers({
        posts: postReducer,
        form: formReducer,
        auth: authReducers,
        error:errorReducer
})