import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from '../../context/Modal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);


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
  };

  return (
    <>
      {user ? (
        <>
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
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
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li><button onClick={() => setShowModal(true)}>Log In</button></li>
            </ul>

          )}

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}
        </>
      )
      }
    </>
  );
}

export default ProfileButton;
