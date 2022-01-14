import csrfFetch from "../csrf";


const CREATE_BOOKING = 'sessionBookings/create_booking'


const addBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}


export const bookAStay = (booked) => async(dispatch) => {
    const response = await csrfFetch('/api/user/bookings/new', {
        method: 'POST',
        body: JSON.stringify(booked[0])
    })
    const data = await response.json()

    if (data.booking) {
        dispatch(addBooking(data.booking))
    }
    return response
}


const sessionBookingsReducer = (state = {}, action) => {
    let newState= {}
    switch(action.type) {
        case CREATE_BOOKING:
            newState = {...state, [action.booking.id]: action.booking}
        default:
            return state
    }
}

export default sessionBookingsReducer;
