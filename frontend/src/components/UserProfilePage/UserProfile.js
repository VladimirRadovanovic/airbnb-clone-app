import React, { useState } from "react";
import { useDispatch } from "react-redux";
import profileImg from '../../images/t.jpeg'
import { NavLink, Route, Switch } from "react-router-dom";


import UserListings from "./UserListings/UserListings";
import './UserProfile.css'
import profilePlaceholderPic from '../../images/profile-placeholder.png'


function UserProfile({ user }) {
    const dispatch = useDispatch()

    return (
        <main className="user-profile-container">
            <div className="user-info-container">
                <div className="user-image-container">
                    <img className="user-image" src={user ? user.profileImgUrl ? user.profileImgUrl : profilePlaceholderPic : profilePlaceholderPic} alt='user profile image' />
                </div>
                <div className="user-about-container">
                    <h4>Name: {user.username}</h4>
                    <h4>Email: {user.email}</h4>
                </div>
            </div>
            <div className="nav-link-container">
            <NavLink exact to='/api/user/profile'>Your listings</NavLink>
            <NavLink to='/api/user/profile/bookings'>Your bookings</NavLink>
            <NavLink to='/api/user/profile/reviews'>Your reviews</NavLink>
            </div>
            <Switch>
                <Route exact path='/api/user/profile'>
                    <UserListings user={user} />
                </Route>
                <Route path='/api/user/profile/bookings'>
                    <h1>To do bookings</h1>
                </Route>
                <Route path='/api/user/profile/reviews'>
                    <h1>To do reviews</h1>
                </Route>
            </Switch>
        </main>
    )
}

export default UserProfile;
