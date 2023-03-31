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
        {localStorage.getItem("sessionId") && <TitleBar />}
      </header>
      <body className='allContent'>
      <BrowserRouter>
        <Routes>
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={!localStorage.getItem("sessionId") ? <LoginPage /> : <Profile id={localStorage.getItem("userId")} session={localStorage.getItem("sessionId")}/>} 
            />
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/profile" element={!localStorage.getItem("sessionId") ? <LoginPage /> : <Profile id={localStorage.getItem("userId")} myId={localStorage.getItem("userId")} session={localStorage.getItem("sessionId")}/>} 
            />

            <Route path="/messages" element={!localStorage.getItem("sessionId") ? <LoginPage /> : <MessagesPage />} />

            <Route path="/connect" element={!localStorage.getItem("sessionId") ? <LoginPage /> : <ConnectPage id={localStorage.getItem("userId")} myId={localStorage.getItem("userId")} session={localStorage.getItem("sessionId")}/>} />

            <Route path="/settings" element={!localStorage.getItem("sessionId") ? <LoginPage /> :  <Settings id={localStorage.getItem("userId")} session={localStorage.getItem("sessionId")}/>} />

            <Route path="/editProfile" element={!localStorage.getItem("sessionId") ? <LoginPage /> : <Settings id={localStorage.getItem("userId")} session={localStorage.getItem("sessionId")}/>} />

            </Routes>
      </BrowserRouter> 
      </body>
    </div>
  );
}

export default App;
