import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserListings, removeListing } from "../../../store/Listings/sessionListings";
import listingImg from '../../../images/splash-img4.jpg'
import { UpdateSpotModal } from "../../../context/Modal";
import CreateSpotForm from "../../CreateSpotForm/CreateSpotForm";



import './UserListings.css'
import CreateSpotFormModal from "../../CreateSpotForm";


// listing?.price.includes('.') ? '$' + listing.price + '/ night' : '$' + listing.price + '.00 / night'

function UserListings() {
    const dispatch = useDispatch()
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateListing, setUpdateListing] = useState('')

    useEffect(() => {
        dispatch(getUserListings())
    }, [dispatch])

    const listings = useSelector(state => state.sessionListings)
    const sessionListingsList = []
    for (let key in listings) {
        sessionListingsList.push(listings[key])
    }

    const handleRemoveListing = (e) => {
        const id = e.target.id;
        const listingId = Number(id.split('-')[1])

        dispatch(removeListing(listingId))
    }

    const handleUpdateListing = (e) => {
        setShowUpdateModal(true)
        const id = e.target.id;
        const listingId = Number(id.split('-')[1])
        setUpdateListing(listings[listingId])
    }

    return (
        <div className="user-listings-container">
            <div className="list-container">
                <ul className="listings-list">
                    {sessionListingsList.map(listing => (
                        <li className="listings-list-item" key={listing.id}>
                            <div className="listing-container">
                                <div className="listing-image-container">
                                    <div className="main-image-container">
                                        <img className="main-image" src={listingImg} alt='listing image' />
                                    </div>
                                    <div className="side-images-container">
                                        <img className="side-image side-image-1" src={listingImg} alt='listing image' />
                                        <img className="side-image side-image-2" src={listingImg} alt='listing image' />
                                        <img className="side-image side-image-3" src={listingImg} alt='listing image' />
                                        <img className="side-image side-image-4" src={listingImg} alt='listing image' />
                                    </div>
                                </div>
                                <div className="listing-data-container">
                                    <h2 className="title">{listing?.title}</h2>
                                    <p className="description">{listing?.description}</p>
                                    <p className="created-on"><span>Created on: </span> {listing?.createdAt && new Date(listing.createdAt).toDateString()}</p>
                                    <div className="details-container">
                                        <p><span>Address:</span> {listing?.address}</p>
                                        <p><span>City:</span> {listing?.city}</p>
                                        <p><span>State:</span> {listing?.state ? listing.state : 'N/A'}</p>
                                        <p><span>Zip code:</span> {listing?.zipCode}</p>
                                        <p><span>Country:</span> {listing?.country}</p>
                                        <p><span>Bedrooms:</span> {listing?.bedrooms}</p>
                                        <p><span>Bathrooms:</span> {listing?.bathrooms}</p>
                                        {/* <p>Created on: {listing?.createdAt.slice(0, 10)}</p> */}
                                        <p><span>Price:</span> {listing?.price.includes('.') ? '$' + listing.price + ' / night' : '$' + listing.price + '.00 / night'}</p>
                                        {/* <p>${listing.price} / night</p> */}
                                    </div>
                                </div>
                                <div className="listing-button-container">
                                    <button onClick={handleUpdateListing} id={`-${listing.id}`} className="update-listing-button">Update listing</button>
                                    <button onClick={handleRemoveListing} id={`remove-${listing.id}`} className="remove-listing-button">Remove listing</button>
                            {showUpdateModal && (
                                <UpdateSpotModal onClose={() => setShowUpdateModal(false)}>
                                    <CreateSpotForm spot={updateListing} setShowUpdateModal={setShowUpdateModal} />
                                </UpdateSpotModal>
                            )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default UserListings;
