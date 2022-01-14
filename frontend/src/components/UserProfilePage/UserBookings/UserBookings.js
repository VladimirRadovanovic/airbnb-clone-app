import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { getUserBookings } from "../../../store/bookings/sessionBookings";
import './UserBookings.css'



function UserBookings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBookings())
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

    return (
        <div>
            <ul className="users-bookings-list">
                {
                    usersBookingsList.map(booking => (
                        <li key={booking.id}>{booking.id}</li>
                    ))
                }
            </ul>
        </div>

    )

}


export default UserBookings;
