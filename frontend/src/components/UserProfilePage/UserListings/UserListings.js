import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserListings, removeListing } from "../../../store/Listings/sessionListings";
import listingImg from '../../../images/splash-img4.jpg'
import { UpdateSpotModal } from "../../../context/Modal";
import CreateSpotForm from "../../CreateSpotForm/CreateSpotForm";
import CreateSpotFormModal from "../../CreateSpotForm";



import UpdateSpotForm from "../../UpdateSpotForm/UpdateSpotForm";

import UpdateFormModal from "../../UpdateSpotForm";
import { removeInAllListings } from "../../../store/Listings/allListings";



import './UserListings.css'
import { CreateSpotModal } from "../../../context/Modal";


// listing?.price.includes('.') ? '$' + listing.price + '/ night' : '$' + listing.price + '.00 / night'

function UserListings() {
    const dispatch = useDispatch()
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateListing, setUpdateListing] = useState('')



    useEffect(() => {
        dispatch(getUserListings())
    }, [dispatch])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const listings = useSelector(state => state.sessionListings)
    const sessionListingsList = []
    for (let key in listings) {
        listings[key].price = numberWithCommas(listings[key].price)
        sessionListingsList.push(listings[key])
    }

    const handleRemoveListing = (e) => {
        const id = e.target.id;
        const listingId = Number(id.split('-')[1])

        dispatch(removeListing(listingId))
        dispatch(removeInAllListings(listingId))
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
                                    <div className="main-image-container" id='main-image-container-profile'>
                                        <img className="main-image" src={listing?.Images[0].imageUrl ? listing?.Images[0].imageUrl : listingImg} alt='listing image' />
                                    </div>
                                    <div className="side-images-container" id='side-image-container-profile'>
                                        <img className="side-image side-image-1" src={listing?.Images[1].imageUrl ? listing?.Images[1].imageUrl : listingImg} alt='listing image' />
                                        <img className="side-image side-image-2" src={listing?.Images[2].imageUrl ? listing?.Images[2].imageUrl : listingImg} alt='listing image' />
                                        <img className="side-image side-image-3" src={listing?.Images[3].imageUrl ? listing?.Images[3].imageUrl : listingImg} alt='listing image' />
                                        <img className="side-image side-image-4" src={listing?.Images[4].imageUrl ? listing?.Images[4].imageUrl : listingImg} alt='listing image' />
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

                                        <p><span>Price:</span> {listing?.price.includes('.') ? '$' + listing?.price + ' / night' : '$' + listing?.price + '.00 / night'}</p>

                                    </div>
                                </div>
                                <div className="listing-button-container">

                                    <UpdateFormModal spotId={listing?.id} />
                                    <button onClick={handleRemoveListing} id={`remove-${listing?.id}`} className="remove-listing-button">Remove listing</button>


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
