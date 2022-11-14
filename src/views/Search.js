import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../firebase'
import { collection, addDoc } from "firebase/firestore";


export default function Search() {

  // Global States for track data
  const [trackURL, setTrackURL] = useState('')
  const [artistName, setArtistName] = useState('')
  const [albumArtwork, setAlbumArtwork] = useState('')
  const [trackName, setTrackName] = useState('')
  const [albumName, setAlbumName] = useState('')
  const [albumType, setAlbumType] = useState('')
  const [trackID, setTrackID] = useState('')
  const [externalURL, setExternalURL] = useState('')
  const [user, setUser] = useState({})

  const navigate = useNavigate();

  // Authorize User to site
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    })
  });

  // Logout of Site
  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Spotify Access
  const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const secretID = process.env.REACT_APP_SPOTIFY_KEY

  // Get Auth Token from Spotify
  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: 'Basic ' + window.btoa(clientID + ':' + secretID),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const data = await response.json();
    console.log(data);
    const access_token = data['access_token'];
    return access_token;
  };

  // Generate Random Track ID
  const randomTrackID = () => {
    let ID = '';
    const lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersAndNumbersLength = lettersAndNumbers.length;
    ID += lettersAndNumbers.charAt(Math.floor(Math.random() * lettersAndNumbersLength));
    ID += lettersAndNumbers.charAt(Math.floor(Math.random() * lettersAndNumbersLength));
    ID += '*';
    return ID;
  };

  // Generate a Random Number to use as an offset to vary song selection
  const randomNumber = Math.floor(Math.random() * 900);

  // Get Data from Spotify for single song
  const getNewSongInfo = async () => {
    if (audio) {
      stopSong();
    }
    const token = await getToken();
    const id = await randomTrackID();
    const offset = await randomNumber;


    const response = await fetch(`https://api.spotify.com/v1/search?q=${id}&type=track&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    console.log(data);
    if (data.tracks.items.length === 0) {
      getNewSongInfo();
    }
    const songInfo = data.tracks.items[0];

    // Song Preview URL
    const songUrl = songInfo.preview_url;
    setTrackURL(songUrl);

    // Song Artist Name
    const songArtist = songInfo.artists[0].name;
    setArtistName(songArtist);

    // Song Artwork
    const songArtworkUrl = songInfo.album.images[0].url;
    setAlbumArtwork(songArtworkUrl);

    // Song Name
    const songName = songInfo.name;
    setTrackName(songName);

    // Song Album Name
    const songAlbumName = songInfo.album.name;
    setAlbumName(songAlbumName);

    // Song Album Type
    const songAlbumType = songInfo.album.album_type;
    setAlbumType(songAlbumType);

    // Song ID
    const songID = songInfo.id;
    setTrackID(songID);

    // Song External URL
    const songExternalURL = songInfo.external_urls.spotify;
    setExternalURL(songExternalURL);
  };

  let audio;

  // Play button
  const playSong = () => {
    if (audio) {
      stopSong();
    }
    audio = new Audio(trackURL);
    return audio.play();
  };

  // Stop button 
  const stopSong = () => {
    if (audio) {
      return audio.pause();
    }
  };

  // Next or Skip button
  const nextSong = () => {
    if (audio) {
      stopSong();
    }
    getNewSongInfo();
  };

  // Save button - saves data to user's firestore database
  const saveSong = async () => {
    try {
      const docRef = await addDoc(collection(db, "tracks"), {
        url: trackURL,
        artist: artistName,
        artwork: albumArtwork,
        title: trackName,
        album: albumName,
        type: albumType,
        idTrack: trackID,
        extURL: externalURL,
        account: user.email
      });
      console.log("Document written with ID: ", docRef);
      const successBox = document.getElementById('success-box');
      successBox.innerHTML = `<p id="success-text">Successfully added to your songs!</p>`;
      const successText = document.getElementById('success-text');
      setTimeout(function () {
        successText.parentNode.removeChild(successText)
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    getNewSongInfo();
  }, []);

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
          <div className="search-div" id="search-div-1">
            <img src="/images/objects/vol knob.png" id="vol-knob-img" alt="" />
            <div id="switch-div">
              <img src="/images/objects/switch 1.png" className="switch-img" alt="" />
              <img src="/images/objects/switch 1.png" className="switch-img" alt="" />
              <img src="/images/objects/switch 2.png" className="switch-img" alt="" />
              <img src="/images/objects/switch 1.png" className="switch-img" alt="" />
            </div>
            <div id="input-jacks">
              <img src="/images/objects/input jack L.png" className="input-jack-img" alt="" />
              <img src="/images/objects/input jack R.png" className="input-jack-img" alt="" />
            </div>
          </div>
          <div className="search-div" id="search-div-2">
            <img src="/images/objects/tape.png" id="tape-deck-img" alt="" />
            <div id="success-box">

            </div>
            <div id="playback-controls">
              <img src="/images/objects/skip button sm.png" alt="skip" className="playback-control-button control-zoom" onClick={nextSong} />
              <img src="/images/objects/play button sm.png" alt="play" className="playback-control-button control-zoom" onClick={playSong} />
              <img src="/images/objects/stop button sm.png" alt="stop" className="playback-control-button control-zoom" onClick={stopSong} />
              <img src="/images/objects/next button sm.png" alt="next" className="playback-control-button control-zoom" onClick={nextSong} />
              <img src="/images/objects/save button sm.png" alt="save" className="playback-control-button control-zoom" onClick={saveSong} />
            </div>
          </div>
          <div className="search-div" id="search-div-3">
            <div id="album-artwork">
              <img src={albumArtwork} id="artwork-img" alt="" />
            </div>
          </div>
          <div className="search-div" id="search-div-4">
            <img src="/images/objects/vu meter.png" id="vu-meter-img" alt="" />
            <div id="song-info">
              <span>Artist: </span> <span id="artist-span">{artistName}</span>
              <br />
              <span>Title: </span> <span id="track-span">{trackName}</span>
              <br />
              {/* <span>Album: </span> <span id="album-span">{albumName}</span>
              <br /> */}
              <span>Format: </span> <span id="format-span">{albumType}</span>
            </div>
          </div>
        </div>
        <div id="logged-in-user">
          Current User: {user.email}
        </div>
      </div>
    </div>
  )
}
