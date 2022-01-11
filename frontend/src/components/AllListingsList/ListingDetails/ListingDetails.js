import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


import './ListingDetails.css'
// push fix

function ListingDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()

    return (
        <>

            <h1>{id}</h1>

        </>
    )
}


export default ListingDetails;
