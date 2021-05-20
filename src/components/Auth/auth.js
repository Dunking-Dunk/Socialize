import React, { useState } from 'react'
import history from '../../history'
import {useDispatch, useSelector} from 'react-redux'
import { GoogleLogin } from 'react-google-login'

import {signin, signup} from '../../actions/auth'
import './auth.css'

const initialState = {firstName: '', lastName: '', email: '', password: '',confirmPassword: '' }

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const errorData = useSelector(state => state.error)
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const handleShowPassword = () => { setShowPassword((prevShowPassword) => !prevShowPassword) }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (errorData) {
            setIsError((prevIsError) => !prevIsError)
            setTimeout(() => {
                setIsError((prevIsError) => !prevIsError)
            }, 5000)
        }
        if (isSignup) {
            setIsSignup(false)
            history.push('/auth')
            dispatch(signup(formData))
        } else {
            dispatch(signin(formData) )    
        }
    }

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
    try {
        dispatch({ type: 'AUTH', data: { result, token } })
        history.push('/')
    } catch (err) {
        console.log(err)
    }
}
    const googleFailure = (err) => {
        console.log(err)
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }

    return (
        <div className="auth">
            <div className="auth__container">
                {/* <div className="auth__avatar"><i class="far fa-user-ninja"></i></div> */}
                <h5>{isSignup ? 'Sign Up' : 'Sign In'}</h5>
                <p className="auth__error">{isError && errorData}</p>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <div className="auth__names">
                        {
                            isSignup && (
                                <>
                                    <input type="text" name="firstName" className="auth__input" placeholder="First Name" onChange={handleChange} autoFocus required/>
                                    <input type="text"  name="lastName" className="auth__input" placeholder="Last Name" onChange={handleChange} required/>
                                </>
                            )
                        }
                    </div>
                    <input name="email" type="email" className="auth__input" placeholder="Email Address" onChange={handleChange} required />
                    <div className="auth__password--show">
                        <input name="password" type={showPassword ? 'text' : 'password'} className="auth__input" placeholder="Password" onChange={handleChange} required /><a class="auth__button--show" onClick={handleShowPassword}>{showPassword ?<i class="fas fa-eye-slash"></i>:<i class="fas fa-eye"></i>}</a>
                    </div>
                    {
                        isSignup && (
                            <input name="confirmPassword" type={showPassword ? 'text' : 'password'} className="auth__input" placeholder="Repeat Password" onChange={handleChange} required />
                        )
                        }
                        <button className="auth__button">{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>
                <GoogleLogin clientId="307271760186-sqnqh4uhcchjcbr8ru73v6knmjnmj10c.apps.googleusercontent.com" render={(renderProps) => (<button className="auth__button--google" onClick={renderProps.onClick} variant="contained"><i class="fab fa-google"></i>GOOGLE SIGN IN</button>)}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                />
                <div className="auth__ends">
                    <button onClick={switchMode}>
                        {isSignup? 'Already have an account? Sign In' : "Don't have an account, Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth