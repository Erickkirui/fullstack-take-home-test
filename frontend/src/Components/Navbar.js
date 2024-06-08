import React from 'react'
import './Styles/navbar.css'

function Navbar() {
  return (
    <div className='navbarContainer'>
        <div className='navbarLogo'>
            <img src='/images/logo.svg' alt="ell logo"/>
            <h4> teachers</h4>

        </div>
        <div className='navbarUser'>
            <h4>Erick Kirui</h4>
        </div>
      
    </div>
  )
}

export default Navbar
