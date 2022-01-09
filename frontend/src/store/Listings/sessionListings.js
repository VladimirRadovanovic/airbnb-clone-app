import csrfFetch from "../csrf";


const CREATE_LISTING = 'sessionListings/create_listing'

const addListing = (spot) => {
    return {
        type: CREATE_LISTING,
        spot
    }
}

export const createListing = (data) => async(dispatch) => {
    const response = await csrfFetch('/api/listings/new', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    const listingData = await response.json()

    if(listingData.spot) {
        dispatch(addListing(listingData.spot))
    }
    return response
}


const sessionListingsReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case CREATE_LISTING:
            newState = {...state, [action.spot.id]: action.spot}
            return newState
        default:
            return state
    }
}

export default sessionListingsReducer;
