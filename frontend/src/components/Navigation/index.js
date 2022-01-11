import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import whiteLogo from '../../images/white-logo.png'
import redLogo from '../../images/red-logo.png'
import CreateSpotFormModal from '../CreateSpotForm';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [navClass, setNavClass] = useState('nav')
  const [logo, setLogo] = useState(whiteLogo)
  const [logoText, setLogoText] = useState('logo-text')
  const [hostLink, setHostLink] = useState('host-link')





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

    if (y === 0) {
      document.addEventListener('scroll', onScroll)

    }



    return () => document.removeEventListener('scroll', onScroll)
  },[navClass])

  useEffect(() => {
    let y = window.scrollY


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
      setHostLink('host-link')
      return

    } else {
      if (navClass === 'nav-white' && y !== 0) return


      setNavClass('nav-white')
      setLogo(redLogo)
      setLogoText('logo-text-red')
      setHostLink('host-link-white')

      return
    }

  }


  return (
    <>
      <nav className={navClass}>
        <ul className='nav-list'>
          <li className='class-container'>
            <NavLink className='logo-link' exact to="/"><img className='logo-img' src={logo} alt='logo'></img><span className={logoText}>EarthBnB</span></NavLink>

          </li>

          <li className='li-container'>

            <CreateSpotFormModal hostLink={hostLink} />
            <div>
            {isLoaded && <ProfileButton user={sessionUser} />}

            </div>
          </li>
        </ul>
      </nav>

    </>
  );
}

export default Navigation;
