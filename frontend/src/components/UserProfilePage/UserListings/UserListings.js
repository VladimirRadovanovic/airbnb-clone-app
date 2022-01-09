import { useDispatch, useSelector } from "react-redux";


import './UserListings.css'


function UserListings() {
    const dispatch = useDispatch()

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
                        <li className="listings-list-item">
                            <p>{listing.title}</p>
                            <p>{listing.address}</p>
                            <p>{listing.price.includes('.') ? '$' + listing.price + '/ night' : '$' + listing.price + '.00 / night'}</p>
                            {/* <p>${listing.price} / night</p> */}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default UserListings;
