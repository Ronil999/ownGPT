import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            OwnGPT
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {auth ?
            <>
              <ul className={click ? 'nav-menu active' : 'nav-menu'} >
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/textify'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Textify
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/imaginex'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Imaginex
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/history'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    History
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/profile'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                </li>


              </ul>
              <button className='homepagbtn' onClick={logout}>Logout</button>
            </> : <>
              <ul className={click ? 'nav-menu active' : 'nav-menu'} style={{ marginBottom: "1rem" }}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/contact'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
              <Link to='/signup'><button className='homepagbtn'>Sign Up</button></Link>
              <Link to='/login'><button className='homepagbtn'>Sign in</button></Link>
            </>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
