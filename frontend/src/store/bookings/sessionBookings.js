import csrfFetch from "../csrf";


const CREATE_BOOKING = 'sessionBookings/create_booking'
const GET_BOOKINGS = 'sessionBookings/get_bookings'
const REMOVE_BOOKING = 'sessionBookings/remove_bookings'
const REMOVE_USERS_BOOKINGS = 'sessionBookings/remove_users-bookings'

const deleteBooking =(id) => {
    return {
        type: REMOVE_BOOKING,
        id
    }
}

export const removeUsersBookings = () => {
    return {
        type: REMOVE_USERS_BOOKINGS
    }
}


const addBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const getBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings
    }
}

export const cancelBooking = (id) => async(dispatch) => {
    const response = await csrfFetch('/api/user/bookings/delete', {
        method: 'DELETE',
        body: JSON.stringify({id})
    })

    const data = await response.json()
    if (data.message = 'Deleted') {
        dispatch(deleteBooking(id))
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

export const getUserBookings = () => async(dispatch) => {
    const response = await csrfFetch('/api/user/bookings')
    const bookingsData = await response.json()
    if (bookingsData.bookings) {
        console.log(bookingsData.bookings, '******booking data*******')
        dispatch(getBookings(bookingsData.bookings))
    }
    return response
}


const sessionBookingsReducer = (state = {}, action) => {
    let newState= {}
    switch(action.type) {
        case REMOVE_USERS_BOOKINGS:
            return newState
        case REMOVE_BOOKING:
            newState = {...state}
            delete newState[action.id]
            return newState
        case GET_BOOKINGS:
            newState={...state}
            console.log(action.bookings, '*****inReducer*******')
            action.bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState
        case CREATE_BOOKING:
            newState = {...state, [action.booking.id]: action.booking}
        default:
            return state
    }
}

export default sessionBookingsReducer;
