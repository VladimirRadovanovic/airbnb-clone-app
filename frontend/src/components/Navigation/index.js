import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import whiteLogo from '../../images/white-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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

  return (
    <nav className='nav'>
    <ul className='nav-list'>
      <li className='class-container'>
        <NavLink className='logo-link' exact to="/"><img className='logo-img' src={whiteLogo} alt='logo'></img><span className='logo-text'>EarthBnB</span></NavLink>

      </li>
      <li>

        {isLoaded && <ProfileButton user={sessionUser}/>}
      </li>
    </ul>
    </nav>
  );
}

export default Navigation;
