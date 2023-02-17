import React, { useState } from 'react';  
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import TitleBar from './custom-components/TitleBar';
import Button from 'react-bootstrap/Button';
import Profile from './pages/Profile';
import MessagesPage from './pages/MessagesPage';
import ConnectPage from './pages/ConnectPage';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/LoginPage';

function App() {
  
  return (
    <div className="App">
      <header>
        {localStorage.getItem("userId") && <TitleBar />}
      </header>
      <body className='allContent'>
      <BrowserRouter>
        <Routes>
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={!localStorage.getItem("userId") ? <LoginPage /> : <Profile id={localStorage.getItem("userId")}/>} 
            />
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/profile" element={!localStorage.getItem("userId") ? <LoginPage /> : <Profile id={localStorage.getItem("userId")}/>} 
            />

            <Route path="/messages" element={!localStorage.getItem("userId") ? <LoginPage /> : <MessagesPage />} />

            <Route path="/connect" element={!localStorage.getItem("userId") ? <LoginPage /> : <ConnectPage id={localStorage.getItem("userId")}/>} />

            <Route path="/settings" element={!localStorage.getItem("userId") ? <LoginPage /> :  <Settings id={localStorage.getItem("userId")}/>} />

            <Route path="/editProfile" element={!localStorage.getItem("userId") ? <LoginPage /> : <Settings id={localStorage.getItem("userId")}/>} />

            </Routes>
      </BrowserRouter> 
      </body>
    </div>
  );
}

export default App;
