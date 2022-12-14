import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {

    return (
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
                    <div id="home-content">
                        <img src="/images/home-cassettes.png" alt="" id="home-img"/>   
                    </div>
                </div>
            </div>
        </div>
    )
}
