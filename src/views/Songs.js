import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../firebase'
import { collection, getDocs, query, where } from "firebase/firestore";
// import { hover } from '@testing-library/user-event/dist/hover';


export default function Songs() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const tracksRef = collection(db, "tracks");


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log(user);
        })
    }, []);

    useEffect(() => {
        document.getElementById('allAlbumContainer').innerHTML = ''
    });

    const logout = async () => {
        await signOut(auth)
        navigate('/')
    };

    // const readTracks = async () => {
    //     const querySnapshot = await getDocs(collection(db, "tracks"));
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // };

    // const deleteSong = async (event) => {
    //     let deleteID = (event.target.id);
    //     console.log(deleteID)

    //     const q = query(collection(db, "tracks"), where("account", "==", `${user.email}`), where("idTrack", "==", `${deleteID}`));

    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //       const docRef = doc(db, "tracks", doc.id);
    //       console.log(docRef)
    //       deleteDoc(docRef)
    // }); 
    // }

    // const goToSpotify = async (event) => {
    //     let spotifyLink = (event.target.id);
    //     console.log(spotifyLink)
    //     const openInNewTab = () => {
    //         window.open(spotifyLink, '_blank', 'noopener,noreferrer');
    //       };
    //     navigate(`{()=>window.open('${spotifyLink}','_blank')}`)
    // }


    useEffect(() => {
        const q = query(tracksRef, where("account", "==", `${user.email}`));

        const getUserTracks = async () => {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const data = doc.data();
                const artworkURL = data.artwork
                const songID = data.idTrack
                const songURL = data.url
                const spotifyURL = data.extURL

                const newAlbumContainer = document.createElement("div");
                newAlbumContainer.className += 'track-card-img zoom';

                const newAlbumArtwork = document.createElement("img");
                newAlbumArtwork.className += 'track-card-artwork';
                newAlbumArtwork.id += `${songID}`
                newAlbumArtwork.src = `${artworkURL}`

                const newAlbumArtworkOverlay = document.createElement('div');
                newAlbumArtworkOverlay.className += 'artwork-overlay';

                const newDeleteButton = document.createElement('button');
                newDeleteButton.className += 'card-button';
                newDeleteButton.id += `${songID}`
                newDeleteButton.innerText += 'Delete';
                // newDeleteButton.addEventListener('click', deleteSong)


                const newListenButton = document.createElement('button');
                newListenButton.className += 'card-button';
                newListenButton.id += `${songURL}`;
                newListenButton.innerText += 'Listen';

                const newSpotifyButton = document.createElement('button');
                newSpotifyButton.className += 'card-button';
                newSpotifyButton.id += `${spotifyURL}`
                newSpotifyButton.innerText += 'Spotify';
                // newSpotifyButton.addEventListener('click', goToSpotify)

                newAlbumArtworkOverlay.appendChild(newDeleteButton)
                newAlbumArtworkOverlay.appendChild(newListenButton)
                newAlbumArtworkOverlay.appendChild(newSpotifyButton)

                newAlbumContainer.appendChild(newAlbumArtwork)
                newAlbumContainer.appendChild(newAlbumArtworkOverlay)

                document.getElementById('allAlbumContainer').appendChild(newAlbumContainer)

            });
        }
        getUserTracks()
    });

    let audio

    // Stop song 
    const stopSong = () => {
        if (audio) {
            return audio.pause()
        }
    };

    // Stop Song and Logout   
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
                    <div className='track-card-item' id='allAlbumContainer'>
                        {/* Album Artwork shows up here */}

                        {/* This is the template for the artwork rendering in the page */}

                        {/* <div className='track-card-img zoom'>
                            <img src="/images/testcarouselimages/ab67616d0000b273fa2a62fe48c2c929c834c084.jpeg" alt="" name=`${songID}` id=`${songID}` className='track-card-artwork'/>
                            <div className="artwork-overlay">
                                <button className="card-button">Delete</button>
                                <button className="card-button">Listen</button>
                                <button className="card-button">Spotify</button>
                            </div>
                        </div> */}

                    </div>
                </div>
                <div id="logged-in-user">
                    Current User: {user.email}
                </div>
            </div>
        </div>
    )
}
