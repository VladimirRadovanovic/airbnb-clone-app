
const GET_ALL_LISTINGS = 'allListings/get_all_listings'
const CREATE_IN_ALL = 'allListings/create_in_all'
const REMOVE_IN_ALL = 'allListings/remove_in_all'
const UPDATE_IN_ALL_LISTINGS = 'allListings/update_in_all_listings'

const getListings = (listings) => {
    return {
        type: GET_ALL_LISTINGS,
        listings
    }
}

export const createInAllListings = (listing) => {

    return {
        type: CREATE_IN_ALL,
        listing
    }
}

export const removeInAllListings = (listingId) => {
    return {
        type: REMOVE_IN_ALL,
        listingId
    }
}

export const updateInAllListings = (listing) => {
    return {
        type: UPDATE_IN_ALL_LISTINGS,
        listing
    }
}


export const getAllListings = () => async(dispatch) => {
    const response = await fetch('/api/listings/all')

    if (response.ok) {
        const data = await response.json()
        if (data.listings) {
            dispatch(getListings(data.listings))

        }
    }
}

const allListingsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case UPDATE_IN_ALL_LISTINGS:
            newState = {
                ...state,
                [action.listing.id]: action.listing
            }
            return newState
        case REMOVE_IN_ALL:
            newState = {...state}
            delete newState[action.listingId]
            return newState
        case CREATE_IN_ALL:
            newState = { ...state, [action.listing.id]: action.listing }
            return newState
        case GET_ALL_LISTINGS:
            newState= {...state}
            action.listings.forEach(listing => {
                newState[listing.id] = listing
            });
            return newState
        default:
            return state
    }
}

export default allListingsReducer;
