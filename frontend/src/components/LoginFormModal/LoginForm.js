import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css'

function LoginForm({ setShowLoginModal, setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);




  const handleClick = () => {
    if (setShowLoginModal) {
      return setShowLoginModal(false)
    }
    if (setShowModal) {
      return setShowModal(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <div className="modal-login-header">
        <span><button type='button' onClick={handleClick}>X</button></span>
        <div className="title-container">
          <h3>Log in</h3>
        </div>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="welcome-span">Welcome to EarthBnB</span>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="input-container">
            {/* <label>
        Username or Email
        </label> */}
            <input
              placeholder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
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
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
