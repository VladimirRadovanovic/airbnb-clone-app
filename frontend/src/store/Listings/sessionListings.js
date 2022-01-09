import csrfFetch from "../csrf";


const CREATE_LISTING = 'sessionListings/create_listing'

const addListing = (spot) => {
    return {
        type: CREATE_LISTING,
        spot
    }
}

export const createListing = (data) => async (dispatch) => {
    // price = Number(price.slice(1))
    data.price = Number(data.price.slice(1))

    if (data.state.length > 1 || data.state.length === 0) {
        data.state = null
    }else {
        data.state = data.state[0]
    }


    const response = await csrfFetch('/api/listings/new', {
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
        case CREATE_LISTING:
            newState = { ...state, [action.spot.id]: action.spot }
            return newState
        default:
            return state
    }
}

export default sessionListingsReducer;
