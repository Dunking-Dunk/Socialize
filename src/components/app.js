import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'

import Main from './main/main'
import Createpost from '../components/createpost/createpost'
import EditPost from '../components/editpost/editpost'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/footer'
import Auth from '../components/Auth/auth'
 
import './app.css'

const App = () => {
    return (
        <>
            <Router history={history}>
                <Header/>
                <Route exact component={Main} path="/" />
                <Route exact component={Createpost} path="/new" />
                <Route exact component={EditPost} path="/edit/:id" />
                <Route exact component={Auth} path="/auth" />
                <Footer/>
            </Router>
    </>
    )
}

export default App