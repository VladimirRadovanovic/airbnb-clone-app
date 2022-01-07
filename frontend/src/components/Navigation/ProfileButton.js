import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from '../../context/Modal';
import whiteLogo from '../../images/white-logo.png'
import profilePlaceholderPic from '../../images/profile-placeholder.png'
import profilePic from '../../images/t.jpeg'
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
            <img className="profile-img" src={user ? profilePic : profilePlaceholderPic} alt='profile picture' />

            </div>
          </button>
          {showMenu && (
            <div className="dropdown-container">
            <div className="profile-dropdown">
              <div className="dropdown-user-info">{user.username}</div>
              <div className="dropdown-user-info">{user.email}</div>
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
            </div>

          )}

          {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
              <LoginForm setShowLoginModal={setShowLoginModal} />
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
