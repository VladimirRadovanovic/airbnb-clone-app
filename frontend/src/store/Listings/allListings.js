
const GET_ALL_LISTINGS = 'allListings/get_all_listings'

const getListings = (listings) => {
    return {
        type: GET_ALL_LISTINGS,
        listings
    }
}


export const getAllListings = () => async(dispatch) => {
    
}
