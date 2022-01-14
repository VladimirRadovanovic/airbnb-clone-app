import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { getUserBookings } from "../../../store/bookings/sessionBookings";
import { getAllListings } from "../../../store/Listings/allListings";
import './UserBookings.css'



function UserBookings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBookings())
        dispatch(getAllListings())
    }, [dispatch])

    const bookings = useSelector(state => state.bookings)
    const listings = useSelector(state => state.listings)
    console.log(listings, '*******listings*****')
    const user = useSelector(state => state.session.user)


    const bookingsList = []
    for (let key in bookings) {
        let booking = bookings[key]

        console.log(listings[booking.spotId], '******listing attacher********')
        booking.listing = listings[booking.spotId]
        bookingsList.push(
            booking
        )
    }

    const usersBookingsList = []
    bookingsList.forEach(booking => {
        if (booking.userId === user.id) {
            usersBookingsList.push(booking)
        }
    })

    return (
        <div className="user-bookings-container">
            <ul className="users-bookings-list">
                {
                    usersBookingsList.map(booking => (
                        <li key={booking.id}>
                            <div className="bookings-image-container">
                                <img src={booking.listing.Images[0].imageUrl} />
                            </div>
                            <div>
                                <h2>{booking.listing.title}</h2>
                                <span>Booked on: {booking.createAt}</span>
                                <span>Start date{booking.startDate}</span>
                                <span>End date{booking.endDate}</span>
                                <span>Hosted by:{booking.listing.User.username}</span>
                                <span>Bathrooms:{booking.listing.bathrooms}</span>
                                <span>Bedrooms:{booking.listing.bedrooms}</span>
                                <span>Price: ${booking.listing.price} / night</span>
                                <span>Address:{booking.listing.address}</span>
                                <span>City:{booking.listing.city}</span>
                                <span>State:{booking.listing.state}</span>
                                <span>Zip code:{booking.listing.zipCode}</span>
                                <span>Country:{booking.listing.country}</span>

                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>

    )

}


export default UserBookings;
