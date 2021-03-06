import csrfFetch from "../csrf";
import { createInAllListings } from "./allListings";
import { updateInAllListings } from "./allListings";


const CREATE_LISTING = 'sessionListings/create_listing'
const GET_USER_LISTINGS = 'sessionListings/get_user_listings'
const REMOVE_LISTING = 'sessionListings/remove_listing'
const UPDATE_LISTING = 'sessionListings/update_listing'
const REMOVE_USER_LISTINGS = 'sessionListings/remove_user_listings'

const deleteListing = (id) => {
    return {
        type: REMOVE_LISTING,
        id
    }
}

const updateUserListing = (listing) => {
    return {
        type: UPDATE_LISTING,
        listing
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

export const removeUserListings = () => {
    return {
        type: REMOVE_USER_LISTINGS
    }
}


export const updateListing = (data) => async(dispatch) => {

    if(data.price.startsWith('$')) {
        data.price = parseFloat(data.price.slice(1).split(',').join('')).toFixed(2)

    }else {
        data.price = parseFloat(data.price.split(',').join('')).toFixed(2)

    }


    if (data.state.length > 1 || data.state.length === 0) {
        data.state = null
    }else {
        data.state = data.state[0]
    }

    const response = await csrfFetch('/api/user/listings/update', {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    const updatedListing = await response.json()
    if (updatedListing.spot) {
        updatedListing.spot.User = updatedListing.user
        updatedListing.spot.Images = updatedListing.images
        dispatch(updateUserListing(updatedListing.spot))
        dispatch(updateInAllListings(updatedListing.spot))
    }
    return response
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

    data.price = parseFloat(data.price.slice(1).split(',').join('')).toFixed(2)
    // data.price = parseFloat(data.price.slice(1)).toFixed(2)

    if (data.state.length > 1 || data.state.length === 0) {
        data.state = null
    }else {
        data.state = data.state[0]
    }

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('address', data.address)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('zipCode', data.zipCode)
    formData.append('country', data.country)
    formData.append('price', data.price)
    formData.append('bedrooms', data.bedrooms)
    formData.append('bathrooms', data.bathrooms)
    formData.append('description', data.description)

    if (data.images && data.images.length !== 0) {
        for (var i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }




    const response = await csrfFetch('/api/user/listings/new', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
    })

    const listingData = await response.json()


    if (listingData.spot) {
        listingData.spot.User = listingData.user
        listingData.spot.Images = listingData.images


        dispatch(addListing(listingData.spot))
        dispatch(createInAllListings(listingData.spot))
    }
    return response
}


const sessionListingsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case REMOVE_USER_LISTINGS:
            return newState
        case UPDATE_LISTING:
            newState = {
                ...state,
                [action.listing.id]: action.listing
            }
            return newState
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
