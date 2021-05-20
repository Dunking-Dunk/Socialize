import React, {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import './Header.css'
import history from '../../history'


const Header = () => {
    const menuBar = useRef()
    const menu = useRef()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const location = useLocation()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser( JSON.parse(localStorage.getItem('profile')) )
    }, [location])
    
    const closeMenu = () => {
        menu.current.classList.toggle('active')
        menuBar.current.classList.toggle('is-active')
    }
      
    const showMenu = () => {
        menuBar.current.classList.toggle('is-active')
        menu.current.classList.toggle('active')
    }
        return (
            <>
                 <nav className="navbar">
                    <div className="navbar__container">
                        <a className="navbar__logo" id="navbar__logo" href="#home">SOCIALIZE</a>
                        <div className="navbar__toggle" id="mobile-menu" ref={menuBar} onClick={showMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        <ul className="navbar__menu" ref={menu}>
                            <li className="navbar__items" onClick={closeMenu}><Link className="navbar__links" to="/">Posts</Link></li>
                            {!user? <li className="navbar__items" onClick={closeMenu}><Link className="navbar__links" to="/auth">Sign In</Link></li>
                                : <><li className="navbar__items" onClick={closeMenu}><Link className="navbar__links" to="/new">Create Post</Link></li>
                                    <li className="navbar__items" onClick={closeMenu}><div className="navbar__links--user" onClick={closeMenu}><h4>Logged In as <br/> <span>{user?.result.name}</span></h4></div></li>
                                <li className="navbar__items" onClick={closeMenu}><button className="navbar__links" onClick={logout}>Logout</button></li></>}
                        </ul>
                    </div>
                </nav>
            </>
        )
}

export default Header


// import React from 'react'
// import {connect} from 'react-redux'
// import { Link } from 'react-router-dom'
// import './Header.css'
// import history from '../../history'
// import { logout } from '../../actions/logout'

// class Header extends React.Component {
//     constructor() {
//         super()
//         this.menuBar = React.createRef()
//         this.menu = React.createRef()
//         this.state= {user:JSON.parse(localStorage.getItem('profile'))}
//     }

//     logout = () => {
//         this.props.logout()
//         history.push('/')
//         this.setState({user:null})
//     }

//     componentWillMount() {
//         const token = this.state.user?.token
//         this.setState({ user: JSON.parse(localStorage.getItem('profile')) })
//     }

//     showMenu = () => {
//         this.menuBar.current.classList.toggle('is-active')
//         this.menu.current.classList.toggle('active')
//     }
//     render() {
//         console.log(this.state.user)
//         return (
//             <>
//                  <nav className="navbar">
//                     <div className="navbar__container">
//                         <a className="navbar__logo" id="navbar__logo" href="#home">SOCIALIZE</a>
//                         <div className="navbar__toggle" id="mobile-menu" ref={this.menuBar} onClick={this.showMenu}>
//                             <span className="bar"></span>
//                             <span className="bar"></span>
//                             <span className="bar"></span>
//                         </div>
//                         <ul className="navbar__menu" ref={this.menu}>
//                             <li className="navbar__items"><Link className="navbar__links" to="/">Posts</Link></li>
//                             {!this.state.user? <li className="navbar__items"><Link className="navbar__links" to="/auth">Sign In</Link></li>
//                                 :<><li className="navbar__items"><Link className="navbar__links" to="/new">Create Post</Link></li>
//                                 <li className="navbar__items"><button className="navbar__links" onClick={this.logout}>Logout</button></li></>}
//                         </ul>
//                     </div>
//                 </nav>
//             </>
//         )
//     }
  
// }

// export default connect(null, {logout})(Header)