import './App.css';
import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import FAQ from './views/FAQ';
import PrivateRoutes from './utils/PrivateRoutes';
import Search from './views/Search';
import Songs from './views/Songs';
 
export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/FAQ' element={<FAQ />}></Route>
              <Route path='/Search' element={<Search />}></Route>
              <Route path='/Songs' element={<Songs />}></Route>
            </Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Signup' element={<Signup />}></Route>
            <Route path='/Login' element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}