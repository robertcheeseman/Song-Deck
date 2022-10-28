import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../firebase'

export default function PrivateRoutes() {

    const [token, setToken] = useState({})

    useEffect(() => { onAuthStateChanged(auth, (user) => {
        if (user) {
            setToken(true)
        } else {
            setToken(false)
        }
    })})

  return (
    token ? <Outlet/> : <Navigate to='/Login'/>
  )
}
