import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from '../../context/Modal';
import whiteLogo from '../../images/white-logo.png'
import profilePic from '../../images/profile.jpeg'
import './ProfileButton.css';




function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    setShowLoginModal(false)
    setShowSignupModal(false)
  };

  return (
    <>
      {user ? (
        <>
          <button className="profile-button" onClick={openMenu}>
            <i className="fas fa-bars bars" />
            <div className="profile-img-container">
            <img className="profile-img" src={profilePic} alt='profile picture' />

            </div>
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </>
      ) : (
        <>
          <button className="profile-button" onClick={openMenu}>
            <i className="fas fa-bars bars" />
            <div className="profile-img-container">
            <img className="profile-img" src={profilePic} alt='profile picture' />

            </div>

          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li><button onClick={() => setShowLoginModal(true)}>Log In</button></li>
              <li><button onClick={() => setShowSignupModal(true)}>Sign Up</button></li>
            </ul>

          )}

          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <LoginForm />
            </Modal>
          )}
          {showSignupModal && (
            <Modal onClose={() => setShowSignupModal(false)}>
              <SignupForm />
            </Modal>
          )}
        </>
      )
      }
    </>
  );
}

export default ProfileButton;
