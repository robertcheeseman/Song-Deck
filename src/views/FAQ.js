import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase'

export default function Account() {

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

    let audio

    // Stop song 
    const stopSong = () => {
        if (audio) {
            return audio.pause()
        }
    };

    const stopAndLogout = () => {
        stopSong();
        logout();
    }

    return (
        <div id="tape-deck-container">
            <div name="nav-container" id="nav-container">
                <img src="/images/horizontal-top.jpg" id="nav-top-img" alt="" />
                <div id="nav-content">
                    <div className="nav-link nav-link-left">
                        <img src="/images/objects/corner button 2.png" className="nav-button-img-left" alt="" />
                        <Link className="nav-button-img left" to="/Search"><img src="/images/objects/search.png" alt="" onClick={stopSong} /></Link>
                        <img src="/images/objects/corner button 2.png" className="nav-button-img-left" alt="" />
                        <Link className="nav-button-img left" to="/Songs"><img src="/images/objects/songs.png" alt="" onClick={stopSong} /></Link>
                    </div>
                    <div className="nav-logo">
                        <img src="/images/logo.png" id="logo" alt="" />
                    </div>
                    <div className="nav-link nav-link-right">
                        <Link className="nav-button-img right" to="/FAQ"><img src="/images/objects/faq.png" alt="" onClick={stopSong} /></Link>
                        <img src="/images/objects/corner button.png" className="nav-button-img-right" alt="" />
                        <Link className="nav-button-img right" to="/"><img src="/images/objects/logout.png" alt="" id="logout" onClick={stopAndLogout} /></Link>
                        <img src="/images/objects/corner button.png" className="nav-button-img-right" alt="" />
                    </div>
                </div>
            </div>
            <div name="content-container" id="content-container">
                <img src="/images/horizontal-bottom.png" id="content-bottom-img" alt="" />
                <div id="main-content">
                    <div id="questions">
                        <h4>Q. What does Song Deck do?</h4>
                        <h5>A. Song Deck pulls a randomly generated song from Spotify's API.  That song is then displayed for you, the user, and after listening to it you have the option to skip it or save it to your database here on Song Deck.</h5>
                        <hr />
                        <h4>Q. How do the controls work?</h4>
                        <h5>A. Each time you 'LOGIN' or visit the 'SEARCH' tab a new song will automatically be loaded.  Click the 'PLAY' button to hear a 30 second preview of the song.  If you like it, you can click 'SAVE' and the song will be saved to your 'SONGS' tab.  After saving a song, click 'NEXT' to hear another song.  If you dislike a song, simply click 'SKIP' and the current song will stop playing and a new one will be loaded.</h5>
                        <hr />
                        <h4>Q. How do I view my saved songs?</h4>
                        <h5>A. Click on your 'SONGS' tab to see a gallery of all your saved songs.  Scrolling side to side is enabled once your list contains more than four songs.  Hovering over a song's album artwork will allow you to delete the song from your list, preview it again, go to the song on spotify to hear the full track.</h5>
                    </div>


                </div>
                <div id="logged-in-user">
                    Current User: {user.email}
                </div>
            </div>
        </div>
    )
}
