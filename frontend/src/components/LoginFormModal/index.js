import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);





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
