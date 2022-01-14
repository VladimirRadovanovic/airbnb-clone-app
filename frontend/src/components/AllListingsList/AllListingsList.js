import { useDispatch, useSelector } from "react-redux";
import placeholderImg from '../../images/splash-img4.jpg'
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import './AllListingsList.css'
import { getAllListings } from "../../store/Listings/allListings";

function AllListingsList({user}) {
    const dispatch = useDispatch()


    // const user = useSelector(state => state.session.user);

    const listings = useSelector((state) => state.listings)

    useEffect(() => {
        dispatch(getAllListings())
    }, [dispatch])

    const listingsList = [];
    for (let key in listings) {
        if (user) {
            if (listings[key].hostId !== user.id) {
                listingsList.push(listings[key])
            }
        } else {

            listingsList.push(listings[key])
        }
    }
    return (
        <>

            <main className="main-container">
                <div className="left-container">
                <ul className="all-listings-list">
                    {listingsList.map(listing => (
                        <li className="all-listings-list-item" key={listing?.id}>

                            <div className="all-listings-img-container">
                            <img className="all-listings-img" src={listing?.Images[0]?.imageUrl ? listing?.Images[0]?.imageUrl : placeholderImg} alt='listing photo' />
                            </div>
                            <div className="all-listings-data-container">
                            <span className="data">{listing?.city}, {listing?.state ? listing?.state : listing?.country}</span>
                            {/* <span>{listing.state}</span> */}
                            <span className="price">${listing?.price} / night</span>
                            </div>
                            <div className="view-listings-container">
                            <NavLink to={`/api/listings/${listing?.id}`}>View listing</NavLink>
                            </div>
                            </li>
                    ))}
                </ul>
                </div>
                <div className="right-container">

                </div>
            </main>
        </>
    )

}

export default AllListingsList;
