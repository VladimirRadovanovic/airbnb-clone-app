import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import NumberFormat from 'react-number-format';
import DropdownCombobox from "../DropdownCombobox/DropdownCombobox";
import { items } from "../DropdownCombobox/utils";


import './CreateSpot.css';


function CreateSpotForm({ setShowModal, spot }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState(spot?.title || "");
    const [address, setAddress] = useState(spot?.address || "");
    const [city, setCity] = useState(spot?.city || "");
    const [state, setState] = useState(spot?.state || '');
    const [zipCode, setZipCode] = useState(spot?.zipCode || "");
    const [country, setCountry] = useState(spot?.country || "");
    const [price, setPrice] = useState(spot?.price || "");
    const [bedrooms, setBedrooms] = useState(spot?.bedrooms || '');
    const [bathrooms, setBathrooms] = useState(spot?.bathrooms || '');
    const [description, setDescription] = useState(spot?.description || "");
    const [errors, setErrors] = useState([]);

    console.log(state, 'price')


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([])

        const spot = {
            title,
            address,
            city,
            state,
            zipCode,
            country,
            price,
            bedrooms,
            bathrooms,
            description
        }

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
        }
        console.log(spot)
        return dispatch(createSpot(spot)).then(() => reset()).then(() => setShowModal(false)).catch(
            async(res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            }
        )

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
