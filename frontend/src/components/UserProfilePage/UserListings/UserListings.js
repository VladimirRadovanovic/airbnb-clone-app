import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserListings } from "../../../store/Listings/sessionListings";


import './UserListings.css'


function UserListings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserListings())
    },[dispatch])

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
                            <p>{listing?.title}</p>
                            <p>{listing?.address}</p>
                            <p>{listing?.price.includes('.') ? '$' + listing.price + '/ night' : '$' + listing.price + '.00 / night'}</p>
                            {/* <p>${listing.price} / night</p> */}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default UserListings;
