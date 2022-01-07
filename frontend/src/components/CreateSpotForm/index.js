import React, { useState } from 'react';
import { CreateSpotModal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';

import './CreateSpot.css'

function CreateSpotFormModal({isLoaded}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='host-link' onClick={() => setShowModal(true)}>Try hosting</button>
      {showModal && (
        <CreateSpotModal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </CreateSpotModal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
