import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import NumberFormat from 'react-number-format';
import DropdownCombobox from "../DropdownCombobox/DropdownCombobox";
import { items } from "../DropdownCombobox/utils";
import { createListing, updateListing } from "../../store/Listings/sessionListings";
import { createInAllListings } from "../../store/Listings/allListings";



import './CreateSpot.css';


function CreateSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    let [state, setState] = useState('');
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);


    // useEffect(() => {

    //     if (state?.length > 1) {
    //         setState(spot?.state)
    //     }
    // }, [state])



    const handleClick = () => {


        setShowModal(false)

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([])

        const reset = () => {
            setTitle('')
            setAddress('')
            setCity('')
            setState('')
            setZipCode('')
            setCountry('')
            setPrice('')
            setBedrooms('')
            setBathrooms('')
            setDescription('')
            setImages([])
        }



        const listing = {
            title,
            address,
            city,
            state,
            zipCode,
            country,
            price,
            bedrooms,
            bathrooms,
            description,
            images
        }



        return dispatch(createListing(listing)).then(() => reset()).then(() => setShowModal(false)).then(() => history.push('/api/user/profile')).catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            }
        ).finally(() => {
            // console.log(data?.spot, 'in finally************')
            // if (data.spot) dispatch(createInAllListings(listing))
        })



    };
    const stateSetter = (x) => {
        setState(x)
    }

    const updateFiles = (e) => {
        const files = e.target.files;
        setImages(files);
    };

    return (
        <>
            <div className="modal-signup-header">
                <span><button onClick={handleClick} type='button'>X</button></span>
                <div className="title-container">
                    <h3>Try Hosting</h3>
                </div>
            </div>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    {/* <span className="welcome-span">Welcome to EarthBnB</span> */}
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="spot-input-container">

                        <input
                            placeholder="Title *"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Address *"
                            type="text"
                            value={address}
                            // disabled = {spot !== undefined}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <input
                            placeholder="City *"
                            // disabled = {spot !== undefined}
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />


                        <DropdownCombobox stateSetter={stateSetter} />
                        <input
                            placeholder="Zip code *"
                            // disabled = {spot !== undefined}
                            type='text'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Country *"
                            // disabled = {spot !== undefined}
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />

                        <NumberFormat
                            placeholder='Price per night *'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            thousandSeparator={true}
                            prefix="$"
                            className="some"
                            inputMode="numeric"
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                        />

                        <div className="num-rooms-container">
                            <input
                                placeholder="Bedrooms *"
                                type='number'
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                min={0}
                                required
                            />
                            <input
                                placeholder="Bathrooms *"
                                type='number'
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                min={0}
                                required
                            />
                        </div>
                        <input
                            placeholder="Description *"
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            multiple
                            onChange={updateFiles} />
                    </div>
                    <button className="create-listing-button" type="submit">Create listing</button>

                </form>
            </div>
        </>
    )
}


export default CreateSpotForm;
