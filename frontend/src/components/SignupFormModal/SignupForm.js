import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import redLogo from '../../images/red-logo.png'
import upload from '../../images/upload.svg'
import checkMark from '../../images/check.svg'


import './SignupForm.css';


function SignupForm({ setShowSignupModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showCheckMark, setShowCheckMark] = useState(false)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (image) {


        setShowCheckMark(true)


    }
  }, [image])

  const handleClick = () => {
    setShowSignupModal(false)
  }

  // i did not add the reset function that had it in the example
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, image }))
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
              placeholder="Email *"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <label>
          Username
          </label> */}
            <input
              placeholder="Username *"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {/* <label>
          Password
          </label> */}
            <input
              placeholder="Password *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <label>
          Confirm Password
          </label> */}
            <input
              placeholder="Confirm password *"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showCheckMark ? <div className="check-container"><img className="check-image" src={checkMark} alt='success' /></div> :

            <div className="file-input-container">
              <label className="image-upload-container">
                <div className="inside-container">
                  <input className="signup-image-upload" type="file" onChange={updateFile} />
                  <img className="upload-logo" src={upload} alt='upload icon' />
                  <span className="upload-text">Upload photo</span>
                </div>
              </label>
            </div>
            }

          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
