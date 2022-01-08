import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './CreateSpot.css';

function CreateSpotForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
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
                        {/* <label>
            Email
            </label> */}
                        <input
                            placeholder="Title"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* <label>
            Username
            </label> */}
                        <input
                            placeholder="Address"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {/* <label>
            Password
            </label> */}
                        <input
                            placeholder="City"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* <label>
            Confirm Password
            </label> */}
                        <input
                            placeholder="State"
                            type="text"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Zip code"
                            type='text'
                            required
                        />
                        <input
                            placeholder="Country"
                            type='text'
                            required
                        />
                        <input
                            placeholder="Price"
                            type='text'
                            required
                        />
                        <div className="num-rooms-container">
                        <input
                            placeholder="Bedrooms"
                            type='number'
                            required
                        />
                        <input
                            placeholder="Bathrooms"
                            type='number'
                            required
                        />
                        </div>
                        <input
                            placeholder="Description"
                            type='text'
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
