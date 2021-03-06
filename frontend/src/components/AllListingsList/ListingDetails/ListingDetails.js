import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ninja from '../../../images/ninja.png'


import listingImg from '../../../images/splash-img4.jpg'
import MyCalendar from "../../DatePicker/DatePicker";


import './ListingDetails.css'
// push fix
// push fix

function ListingDetails() {
    const dispatch = useDispatch()
    const listings = useSelector((state) => state.listings)

    const { id } = useParams()
    let listing = listings[id]


    return (
        <>


            <div className="single-listing-container">
                <div className="listing-container">
                    <div className="listing-image-container listing-detail-img-container">
                        <div className="main-image-container detail-main-img-container">
                            <img className="main-image detail-main-img" src={listing?.Images[0]?.imageUrl ? listing?.Images[0]?.imageUrl : listingImg} alt='listing image' />
                        </div>
                        <div className="side-images-container detail-side-img-container">
                            <img className="side-image side-image-1 detail-side-img" src={listing?.Images[1]?.imageUrl ? listing?.Images[1]?.imageUrl : listingImg} alt='listing image' />
                            <img className="side-image side-image-2 detail-side-img" src={listing?.Images[2]?.imageUrl ? listing?.Images[2]?.imageUrl : listingImg} alt='listing image' />
                            <img className="side-image side-image-3 detail-side-img" src={listing?.Images[3]?.imageUrl ? listing?.Images[3]?.imageUrl : listingImg} alt='listing image' />
                            <img className="side-image side-image-4 detail-side-img" src={listing?.Images[4]?.imageUrl ? listing?.Images[4]?.imageUrl : listingImg} alt='listing image' />
                        </div>
                    </div>
                    <div className="listing-data-container">
                        <p className="created-on detail-created-on"><span>Created on: {listing?.createdAt && new Date(listing.createdAt).toDateString()}</span> </p>
                        <h2 className="title">{listing?.title}</h2>
                        <div className="details-container" id='in-details-container'>
                            <div className="hosted-by-container">
                                <span>Entire residential home hosted by: {listing?.User.username}</span>
                                <div id='hosted-by-img-container'>
                                <img className="profile-pic-in-details" src={listing?.User?.profileImgUrl ? listing?.User?.profileImgUrl : ninja } />
                                </div>
                            </div>
                        <div className="description" id='in-details-description'>{listing?.description}</div>
                            <div className="hosted-by-data-container">
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
                    </div>
                    <div>
                        <MyCalendar />
                    </div>
                    <div className="listing-button-container">


                        {/* <button id={`book-${listing?.id}`} className="remove-listing-button">Remove listing</button> */}


                    </div>
                </div>

            </div>


        </>
    )
}


export default ListingDetails;
