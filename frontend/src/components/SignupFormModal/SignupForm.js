import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';


function SignupForm({setShowSignupModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleClick = () => {
    setShowSignupModal(false)
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
        <span><button type='button' onClick={handleClick}>X</button></span>
        <div className="title-container">
          <h3>Sign up</h3>
        </div>
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <span className="welcome-span">Welcome to EarthBnB</span>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="signup-input-container">
          {/* <label>
          Email
          </label> */}
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <label>
          Username
          </label> */}
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* <label>
          Password
          </label> */}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <label>
          Confirm Password
          </label> */}
          <input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
