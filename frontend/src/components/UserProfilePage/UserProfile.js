import React, { useState } from "react";
import { useDispatch } from "react-redux";
import profileImg from '../../images/t.jpeg'
import { NavLink, Route, Switch } from "react-router-dom";


import UserListings from "./UserListings/UserListings";
import './UserProfile.css'


function UserProfile({ user }) {
    const dispatch = useDispatch()

    return (
        <main className="user-profile-container">
            <div className="user-info-container">
                <div className="user-image-container">
                    <img className="user-image" src={profileImg} alt='user profile image' />
                </div>
                <div className="user-about-container">
                    <h4>Name: {user.username}</h4>
                    <h4>Email: {user.email}</h4>
                </div>
            </div>
            <NavLink exact to='/api/user/profile'>Listings</NavLink>
            <NavLink to='/api/user/profile/bookings'>Bookings</NavLink>
            <NavLink to='/api/user/profile/reviews'>Reviews</NavLink>
            <Switch>
                <Route exact path='/api/user/profile'>
                    <UserListings user={user} />
                </Route>
                <Route path='/api/user/profile/bookings'>
                    <h1>dasdasd</h1>
                </Route>
                <Route path='/api/user/profile/reviews'>
                    <h1>aaaaaaaaa</h1>
                </Route>
            </Switch>
        </main>
    )
}

export default UserProfile;
