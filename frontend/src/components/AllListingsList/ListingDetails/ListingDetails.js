import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import listingImg from '../../../images/splash-img4.jpg'


import './ListingDetails.css'
// push fix
// push fix

function ListingDetails() {
    const dispatch = useDispatch()
    const listings = useSelector((state) => state.listings)

    const { id } = useParams()
    const listing = listings[id]

    return (
        <>

            {/* <p>{listing.title}</p>
            <p>${listing.price} / night</p>
            <p>{listing.address}</p>
            <p>{listing.city}</p>
            <p>{listing.state}</p> */}
            <div className="single-listing-container">
            <div className="listing-container">
                <div className="listing-image-container">
                    <div className="main-image-container">
                        <img className="main-image" src={listingImg} alt='listing image' />
                    </div>
                    <div className="side-images-container">
                        <img className="side-image side-image-1" src={listingImg} alt='listing image' />
                        <img className="side-image side-image-2" src={listingImg} alt='listing image' />
                        <img className="side-image side-image-3" src={listingImg} alt='listing image' />
                        <img className="side-image side-image-4" src={listingImg} alt='listing image' />
                    </div>
                </div>
                <div className="listing-data-container">
                    <h2 className="title">{listing?.title}</h2>
                    <p className="description">{listing?.description}</p>
                    <p className="created-on"><span>Created on: </span> {listing?.createdAt && new Date(listing.createdAt).toDateString()}</p>
                    <div className="details-container">
                        <p><span>Address:</span> {listing?.address}</p>
                        <p><span>City:</span> {listing?.city}</p>
                        <p><span>State:</span> {listing?.state ? listing.state : 'N/A'}</p>
                        <p><span>Zip code:</span> {listing?.zipCode}</p>
                        <p><span>Country:</span> {listing?.country}</p>
                        <p><span>Bedrooms:</span> {listing?.bedrooms}</p>
                        <p><span>Bathrooms:</span> {listing?.bathrooms}</p>

                        <p><span>Price:</span> {listing?.price.includes('.') ? '$' + listing?.price + ' / night' : '$' + listing?.price + '.00 / night'}</p>

                    </div>
                </div>
                <div className="listing-button-container">


                    <button id={`book-${listing?.id}`} className="remove-listing-button">Remove listing</button>


                </div>
            </div>

            </div>


        </>
    )
}


export default ListingDetails;
