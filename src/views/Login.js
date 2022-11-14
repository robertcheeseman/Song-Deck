import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

export default function Login() {

  // Set User States for login credentials
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  // Login User
  const loginUser = (event) => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate('/Search')
        // ...
      })
      .catch((error) => {
        setError(true)
      });
  }

  return (
    <div>
      <div id="tape-deck-container">
        <div name="nav-container" id="nav-container">
          <img src="/images/horizontal-top.jpg" id="nav-top-img" alt="" />
          <div id="nav-content">
            <div className="nav-link nav-link-left">
              <img src="/images/objects/corner button 2.png" className="nav-button-img-left" alt="" />
              <Link className="nav-button-img left" to="/Signup"><img src="/images/objects/signup.png" alt="" /></Link>
            </div>
            <div className="nav-logo">
              <Link to="/"><img src="/images/logo.png" id="logo" alt="" /></Link>
            </div>
            <div className="nav-link nav-link-right">
              <Link className="nav-button-img right" to="/Login"><img src="/images/objects/login.png" alt="" /></Link>
              <img src="/images/objects/corner button.png" className="nav-button-img-right" alt="" />
            </div>
          </div>
        </div>
        <div name="content-container" id="content-container">
          <img src="/images/horizontal-bottom.png" id="content-bottom-img" alt="" />
          <div id="main-content">
            <div id="login-tape">
              <img src="/images/login-tape.png" alt="" />
            </div>
            <div id="login">
                <form onSubmit={loginUser}>
                  <input type="text" id="email" name="email" className="form-control form-control-lg" placeholder='Email Address' onChange={(event) => { setEmail(event.target.value) }} />
                  <input type="password" id="password" name="password" className="form-control form-control-lg" placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} />
                  <button id="login-button" className="btn btn-secondary btn-lg btn-block" type="submit">Login</button>
                </form>
                <div id="error">
                {error && (<span className='wrong-credentials'>Incorrect E-mail/Password combination, please try again.</span>)}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
