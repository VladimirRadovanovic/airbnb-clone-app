import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserListings } from "../../../store/Listings/sessionListings";
import listingImg from '../../../images/splash-img4.jpg'


import './UserListings.css'


function UserListings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserListings())
    }, [dispatch])

    const listings = useSelector(state => state.sessionListings)
    const sessionListingsList = []
    for (let key in listings) {
        sessionListingsList.push(listings[key])
    }

    return (
        <div className="user-listings-container">
            <div className="list-container">
                <ul className="listings-list">
                    {sessionListingsList.map(listing => (
                        <li className="listings-list-item" key={listing.id}>
                            <div className="listing-container">
                                    <h2>{listing?.title}</h2>
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
                                    <p>{listing?.address}</p>
                                    <p>{listing?.city}</p>
                                    <p>{listing?.state ? listing.state : 'N/A'}</p>
                                    <p>{listing?.zipCode}</p>
                                    <p>{listing?.country}</p>
                                    <p>{listing?.bedrooms}</p>
                                    <p>{listing?.bathrooms}</p>
                                    <p>{listing?.description}</p>
                                    {/* <p>Created on: {listing?.createdAt.slice(0, 10)}</p> */}
                                    <p>Created on: {listing?.createdAt ? new Date(listing.createdAt).toDateString(): null}</p>
                                    <p>{listing?.price.includes('.') ? '$' + listing.price + '/ night' : '$' + listing.price + '.00 / night'}</p>
                                    {/* <p>${listing.price} / night</p> */}
                                </div>
                                <div className="listing-button-container">
                                    <button>Update listing</button>
                                    <button>Remove listing</button>
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
