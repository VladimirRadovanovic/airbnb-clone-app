import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  // console.log(showModal)

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}

        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>

    </>
  );
}

export default LoginFormModal;
