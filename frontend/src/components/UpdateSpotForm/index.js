import UpdateSpotForm from "./UpdateSpotForm";

import { UpdateSpotModal } from "../../context/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";


function UpdateFormModal({spotId}) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [spot, setSpot] = useState({})



    const spots = useSelector(state => state.sessionListings)



    const eventList = [];

    for (let key in spots) {
        eventList.push(spots[key])
    }


    const handleClick = (e) => {
        setShowUpdateModal(true)
        const spotId = e.target.id;
        const id = Number(spotId.split('-')[1])


      setSpot(spots[id])
    }

    return (
      <>
        <button className='update-listing-button' id={`update-${spotId}`} onClick={handleClick}>Update listing</button>
        {showUpdateModal && (
          <UpdateSpotModal onClose={() => setShowUpdateModal(false)}>
            <UpdateSpotForm spot={spot} setShowUpdateModal={setShowUpdateModal} showUpdateModal={showUpdateModal}/>
          </UpdateSpotModal>
        )}
      </>
    );
  }

  export default UpdateFormModal;
