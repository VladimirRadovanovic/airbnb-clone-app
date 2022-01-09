import React, { useState } from "react";
import { useDispatch } from "react-redux";
import profileImg from '../../images/t.jpeg'

import UserListings from "./UserListings/UserListings";
import './UserProfile.css'


function UserProfile({ user }) {
    const dispatch = useDispatch()

    return (
        <>
            <div className="user-info-container">
                <div className="user-image-container">
                    <img className="user-image" src={profileImg} alt='user profile image' />
                </div>
                <div className="user-about-container">
                    <h4>Name: {user.username}</h4>
                    <h4>Email: {user.email}</h4>
                </div>
            </div>
            <UserListings user={user}/>
        </>
    )
}

export default UserProfile;
