import React, { useState } from 'react';
import { CreateSpotModal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';
import LoginFormModal from '../LoginFormModal';
import { useSelector } from 'react-redux';

import './CreateSpot.css'

function CreateSpotFormModal({ isLoaded }) {
    const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            <button className='host-link' onClick={() => setShowModal(true)}>Try hosting</button>
            {sessionUser ? ( showModal && (
                    <CreateSpotModal onClose={() => setShowModal(false)}>
                        <CreateSpotForm />
                    </CreateSpotModal>
                )) : (  showModal && <LoginFormModal setShowModal={setShowModal} />

            )

    }
        </>
    );
}

export default CreateSpotFormModal;
