import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/background/horizontal-top.jpg'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Nav() {

const [user, setUser] = useState({})  
const navigate = useNavigate()

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
})

const logout = async () => {
    await signOut(auth)
    navigate('/')
}

    return (
        <div>
                       
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* Container wrapper */}
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Search">Find Songs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>
                        </ul>
                        {/* Left links */}

                    </div>
                    {/* Right elements */}
                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <p>Hello {user.email}</p> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/Signup">Sign-up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary btn-lg btn-block" type="submit" onClick={logout}>Logout</button>
                            </li>
                                
                           
                        </ul>
                        {/* Avatar
                        <div className="dropdown">
                            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                                <li>
                                    <Link className="dropdown-item" to="/">My SongDeck</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Dashboard</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/">Logout</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    {/* Right elements */}
                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}

        </div>
    )
}
