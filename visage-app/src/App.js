import React, { useState } from 'react';  
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';

import TitleBar from './custom-components/TitleBar';
import Button from 'react-bootstrap/Button';
import Profile from './pages/Profile';
import MessagesPage from './pages/MessagesPage';
import ConnectPage from './pages/ConnectPage';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';

function App() {
  /* enivornment variable for the current user */
  const [id, setId] = useState(2);
  return (
    <div className="App">
      <header>
        <TitleBar />
      </header>
      <body className='allContent'>
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={<Profile id={id}/>} />  {/* Replace with login */}
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/profile" element={<Profile id={id}/>} /> 
            <Route path="/messages" element={<MessagesPage id={id}/>} /> 
            <Route path="/connect" element={<ConnectPage id={id}/>} />
            <Route path="/settings" element={<Settings id={id}/>} /> 
            <Route path="/editProfile" element={<Settings id={id}/>/*<EditProfile id={id}/>*/} />   
        </Routes>
      </BrowserRouter> 
      </body>
    </div>
  );
}

export default App;
