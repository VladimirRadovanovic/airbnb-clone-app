import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { getUserBookings } from "../../../store/bookings/sessionBookings";
import { getAllListings } from "../../../store/Listings/allListings";
import { cancelBooking } from "../../../store/bookings/sessionBookings";
import './UserBookings.css'



function UserBookings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBookings())
        dispatch(getAllListings())
    }, [dispatch])

    const bookings = useSelector(state => state.bookings)
    const listings = useSelector(state => state.listings)

    const user = useSelector(state => state.session.user)


    const bookingsList = []
    for (let key in bookings) {
        let booking = bookings[key]


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

    const handleCancelBooking = (e) => {
        const id = e.target.id;
        const bookingId = Number(id.split('-')[1])
        dispatch(cancelBooking(bookingId))
    }
    // dsa

    return (
        <div className="user-bookings-container">
            <ul className="users-bookings-list">
                {
                    usersBookingsList.map(booking => (
                        <li className="booking-list-item" key={booking.id}>
                            <div className="single-booking-container">
                                <div className="bookings-image-container">
                                    <img className="bookings-image" src={booking?.listing?.Images[0]?.imageUrl} />
                                </div>
                                <div className="align-container">
                                    {/* <div className="bookings-title">{booking?.listing?.title}</div> */}
                                    <div className="new-data-container">
                                        <div className="bookings-data-container">
                                            <div >
                                                <ul>
                                                    <li><span>Booked on: </span>{booking?.createdAt && new Date(booking.createdAt).toDateString()}</li>
                                                    <li><span>Start date: </span>{booking?.startDate && new Date(booking.startDate).toDateString()}</li>
                                                    <li><span>End date: </span>{booking?.endDate && new Date(booking.endDate).toDateString()}</li>
                                                    <li><span>Hosted by: </span>{booking?.listing?.User?.username}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li><span>Bathrooms: </span>{booking?.listing?.bathrooms}</li>
                                                    <li><span>Bedrooms: </span>{booking?.listing?.bedrooms}</li>
                                                    <li><span>Price: </span>${booking?.listing?.price} / night</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li><span>Address: </span>{booking?.listing?.address}</li>
                                                    <li><span>City: </span>{booking?.listing?.city}</li>
                                                    <li><span>State: </span>{booking?.listing?.state}</li>
                                                    <li><span>Zip code: </span>{booking?.listing?.zipCode}</li>
                                                    <li><span>Country: </span>{booking?.listing?.country}</li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleCancelBooking} id={`cancel-${booking?.id}`} className="cancel-booking-button remove-listing-button">Cancel booking</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>

    )

}


export default UserBookings;
