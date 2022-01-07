import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
console.log(setShowModal, showModal, 'inIndex*****')
  // console.log(showModal)

  // function closeModal(prop) {
  //   setShowModal(prop)
  // }

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}

        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} showModal={showModal} />
        </Modal>

    </>
  );
}

export default LoginFormModal;
