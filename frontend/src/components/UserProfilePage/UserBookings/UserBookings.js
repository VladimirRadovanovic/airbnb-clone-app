import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LoginFormModal from "../../LoginFormModal";
import { getUserBookings } from "../../../store/bookings/sessionBookings";


function UserBookings() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    const bookings = useSelector(state => state.sessionBookings)
    const listings = useSelector(state => state.listings)

    const bookingsList = []
    for (let key in bookings) {
        let booking = bookings[key]
        booking.listing = listings[booking.spotId]
        bookingsList.push(
            booking
        )
    }
    return (
        <div>
            <ul>
                {
                    bookingsList.map(booking => (
                        <li key={booking.id}>{booking.id}</li>
                    ))
                }
            </ul>
        </div>

    )

}


export default UserBookings;
