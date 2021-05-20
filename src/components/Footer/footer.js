import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <a className="footer__logo">SOCIALIZE</a>
                <p>@ Socialize 2021. All Rights reserved</p>
                <div className="footer__icons">
                        <a href="/" class="social__icon--link"><i class="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/__hursun_ss__/?hl=en" class="social__icon--link"><i class="fab fa-instagram"></i></a>
                        <a href="/" class="social__icon--link"><i class="fab fa-youtube"></i></a>
                        <a href="/" class="social__icon--link"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
       </div>
    )
}

export default Footer