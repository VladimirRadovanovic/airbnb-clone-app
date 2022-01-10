import csrfFetch from "../csrf";


const CREATE_LISTING = 'sessionListings/create_listing'
const GET_USER_LISTINGS = 'sessionListings/get_user_listings'
const REMOVE_LISTING = 'sessionListings/remove_listing'

const deleteListing = (id) => {
    return {
        type: REMOVE_LISTING,
        id
    }
}


const addListing = (spot) => {
    return {
        type: CREATE_LISTING,
        spot
    }
}

const getListings = (listings) => {
    return {
        type: GET_USER_LISTINGS,
        listings
    }
}

export const updateListing = (data) => async(dispatch) => {
    console.log('in update listing********', data)
}

export const removeListing = (id) => async(dispatch) => {
    const response = await csrfFetch('/api/user/listings/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    })
    const data = await response.json()
    if (data.message === 'Deleted') {
        dispatch(deleteListing(id))
    }
}

export const getUserListings = () => async(dispatch) => {
    const response = await csrfFetch('/api/user/listings')

    const userListings = await response.json()

    if (userListings.spots) {
        dispatch(getListings(userListings.spots))
    }
    return response
}

export const createListing = (data) => async (dispatch) => {

    data.price = Number(data.price.slice(1))

    if (data.state.length > 1 || data.state.length === 0) {
        data.state = null
    }else {
        data.state = data.state[0]
    }


    const response = await csrfFetch('/api/user/listings/new', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    const listingData = await response.json()

    if (listingData.spot) {
        dispatch(addListing(listingData.spot))
    }
    return response
}


const sessionListingsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case REMOVE_LISTING:
            newState = {...state}
            delete newState[action.id]
            return newState
        case GET_USER_LISTINGS:
            newState= {...state}
            action.listings.forEach(listing => {
                newState[listing.id] = listing
            });
            return newState
        case CREATE_LISTING:
            newState = { ...state, [action.spot.id]: action.spot }
            return newState
        default:
            return state
    }
}

export default sessionListingsReducer;
