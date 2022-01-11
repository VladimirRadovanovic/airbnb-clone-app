
const GET_ALL_LISTINGS = 'allListings/get_all_listings'

const getListings = (listings) => {
    return {
        type: GET_ALL_LISTINGS,
        listings
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
