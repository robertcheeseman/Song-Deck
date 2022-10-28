import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    // Set User state for signing up
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    // User Signup
    const userSignup = async (event) => {
        event.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user)
            navigate('/Login')
        }
        catch {
            setError(true)
        }
    }

    return (
        <div>
            <div id="tape-deck-container">
                <div name="nav-container" id="nav-container">
                    <img src="/images/horizontal-top.jpg" id="nav-top-img" alt="" />
                    <div id="nav-content">
                        <div className="nav-link nav-link-left">
                            <img src="/images/objects/corner button 2.png" className="nav-button-img" alt="" />
                            <Link className="nav-button-name-left" to="/Signup"><img src="/images/objects/signup.png" className="nav-button-img" alt="" /></Link>
                        </div>
                        <div className="nav-logo">
                        <Link className="nav-button-name-center" to="/"><img src="/images/logo.png" id="logo" alt="" /></Link>
                        </div>
                        <div className="nav-link nav-link-right">
                            <Link className="nav-button-name-right" to="/Login"><img src="/images/objects/login.png" className="nav-button-img" alt="" /></Link>
                            <img src="/images/objects/corner button.png" className="nav-button-img nav-button-img-right" alt="" />
                        </div>
                    </div>
                </div>
                <div name="content-container" id="content-container">
                    <img src="/images/horizontal-bottom.png" id="content-bottom-img" alt="" />
                    <div id="main-content">

                        <div id="login-tape">
                            <img src="/images/signup-tape.png" alt="" />
                        </div>
                        <div id="login">
                            <form onSubmit={userSignup}>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" placeholder='E-mail' onChange={(event) => { setEmail(event.target.value) }} />
                                <input type="password" id="password" name="password" className="form-control form-control-lg" placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} />
                                <input type="password" id="confirmpassword" name="confirmPassword" className="form-control form-control-lg" placeholder='Confirm Password' onChange={(event) => { setConfirmPassword(event.target.value) }} />
                                {password !== confirmPassword ?
                                    <button disabled id="signup-button" className="btn btn-secondary btn-lg btn-block" type="submit">Sign Up</button> : <button id="signup-button" className="btn btn-secondary btn-lg btn-block" type="submit">Sign Up</button>
                                }
                            </form>
                            <div id="error">
                                {error && (<span className='wrong-credentials'>Email already registered, please try again.</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
