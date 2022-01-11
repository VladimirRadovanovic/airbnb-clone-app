import React, { useState } from 'react';
import { CreateSpotModal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';
import LoginFormModal from '../LoginFormModal';
import { useSelector } from 'react-redux';

import './CreateSpot.css'

function CreateSpotFormModal({ isLoaded }) {
    const [showModal, setShowModal] = useState(false);


    const sessionUser = useSelector(state => state.session.user);

    let y = window.scrollY





    return (
        <>
            {y === 0 ? <button className='host-link' onClick={() => setShowModal(true)}>Try hosting</button> :
                <button className='host-link-white' onClick={() => setShowModal(true)}>Try hosting</button>}
            {sessionUser ? (showModal && (
                <CreateSpotModal onClose={() => setShowModal(false)}>
                    <CreateSpotForm setShowModal={setShowModal} />
                </CreateSpotModal>
            )) : (showModal && <LoginFormModal setShowModal={setShowModal} />)

            }
        </>
    );
}

export default CreateSpotFormModal;
