import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import NumberFormat from 'react-number-format';
import DropdownCombobox from "../DropdownCombobox/DropdownCombobox";
import { items } from "../DropdownCombobox/utils";


import './CreateSpot.css';

function CreateSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    console.log(state, 'price')


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password === confirmPassword) {
        //     setErrors([]);
        //     return dispatch(sessionActions.signup({ email, username, password }))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // }
        // return setErrors(['Confirm Password field must be the same as the Password field']);
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
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />

                        <input
                            placeholder="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
 
                        {/* <input
                            placeholder="State"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        /> */}
                        <DropdownCombobox state={state} setState={setState} />
                        <input
                            placeholder="Zip code"
                            type='text'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Country"
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />

                        <NumberFormat
                            placeholder='Price per night'
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
                                placeholder="Bedrooms"
                                type='number'
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                min={0}
                                required
                            />
                            <input
                                placeholder="Bathrooms"
                                type='number'
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                min={0}
                                required
                            />
                        </div>
                        <input
                            placeholder="Description"
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className="create-listing-button" type="submit">Create listing</button>
                </form>
            </div>
        </>
    )
}


export default CreateSpotForm;
