import { useDispatch, useSelector } from "react-redux";
import placeholderImg from '../../images/splash-img4.jpg'
import { useEffect } from "react";

import './AllListingsList.css'
import { getAllListings } from "../../store/Listings/allListings";

function AllListingsList() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);

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

            <div>
                <ul className="all-listings-list">
                    {listingsList.map(listing => (
                        <li key={listing.id}>
                            <img src={placeholderImg} alt='listing photo' />
                            <p>{listing.title}</p>
                            <p>{listing.bedrooms}</p>
                            <p>{listing.bathrooms}</p>
                            <button id={`listing-${listing.id}`}>View listing</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}

export default AllListingsList;
