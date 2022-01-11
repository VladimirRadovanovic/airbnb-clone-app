import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";


import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal, SignupModal } from '../../context/Modal';

import profilePlaceholderPic from '../../images/profile-placeholder.png'
import profilePic from '../../images/t.jpeg'
import './ProfileButton.css';
import { removeUserListings } from "../../store/Listings/sessionListings";




function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  console.log(showLoginModal, 'loginModal******')
  const [showSignupModal, setShowSignupModal] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    if (!showMenu) return;


    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(removeUserListings())
    history.push('/')
    setShowLoginModal(false)
    setShowSignupModal(false)
  };

  function handleDemo() {
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  return (
    <>
      {user ? (
        <>
          <button className="profile-button" onClick={openMenu}>
            <i className="fas fa-bars bars" />
            <div className="profile-img-container">
              <img className="profile-img" src={user ? profilePic : profilePlaceholderPic} alt='profile picture' />

            </div>
          </button>
          {showMenu && (
            <div className="dropdown-container">
              <div className="profile-dropdown">
                  <div className="user-profile-link-container">
                    <NavLink className='profile-link' to='/api/user/profile' >Profile</NavLink>
                  </div>
                <span className="logout-container">
                  <div>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                  </div>

                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button className="profile-button" onClick={openMenu}>
            <i className="fas fa-bars bars" />
            <div className="profile-img-container">
              <img className="profile-img" src={profilePlaceholderPic} alt='profile picture' />

            </div>

          </button>
          {showMenu && (
            <div className="profile-dropdown">
              <div><button className="login-button" onClick={() => setShowLoginModal(true)}>Log In</button></div>
              <div><button onClick={() => setShowSignupModal(true)}>Sign Up</button></div>
              <div ><div className="demo-button-container"><button onClick={handleDemo}>Demo</button></div></div>
            </div>

          )}

          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <LoginForm setShowLoginModal={setShowLoginModal} />
            </Modal>
          )}
          {showSignupModal && (
            <SignupModal onClose={() => setShowSignupModal(false)}>
              <SignupForm setShowSignupModal={setShowSignupModal} />
            </SignupModal>
          )}
        </>
      )
      }
    </>
  );
}

export default ProfileButton;
