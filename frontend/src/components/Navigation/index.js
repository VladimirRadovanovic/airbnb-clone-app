import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import whiteLogo from '../../images/white-logo.png'
import redLogo from '../../images/red-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [navClass, setNavClass] = useState('nav')
  const [logo, setLogo] = useState(whiteLogo)
  const [logoText, setLogoText] = useState('logo-text')
  console.log(navClass)




  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }


  useEffect(() => {
    let y = window.scrollY
    console.log('firstRunning')
    if (y === 0) {
      document.addEventListener('scroll', onScroll)
      // setX((prevState) => prevState + 1 )
    }



    return () => document.removeEventListener('scroll', onScroll)
  },[navClass])

  useEffect(() => {
    let y = window.scrollY
    console.log('running')

    if (y !== 0) {
      document.addEventListener('scroll', onScroll)
    }
    return () => document.removeEventListener('scroll', onScroll)
  }, [navClass])


  function onScroll() {
    let y = window.scrollY
    // let y;
    if (y === 0 && navClass!== 'nav') {
      if (navClass === 'nav') return
      setNavClass('nav')
      setLogo(whiteLogo)
      setLogoText('logo-text')
      return

    } else {
      if (navClass === 'nav-white' && y !== 0) return
      console.log('rendering*******************')

      setNavClass('nav-white')
      setLogo(redLogo)
      setLogoText('logo-text-red')

      return
    }

  }


  // let y = window.scrollY
  // console.log(y, 'yyyyyyyyyyyyyyyyyyyyy')
  // if (y === 0) {
  //   setNavClass('nav')
  // }

  return (
    <>
      <nav className={navClass}>
        <ul className='nav-list'>
          <li className='class-container'>
            <NavLink className='logo-link' exact to="/"><img className='logo-img' src={logo} alt='logo'></img><span className={logoText}>EarthBnB</span></NavLink>

          </li>
          <li>

            {isLoaded && <ProfileButton user={sessionUser} />}
          </li>
        </ul>
      </nav>

    </>
  );
}

export default Navigation;
