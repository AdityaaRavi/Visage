import React from 'react';  
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css';

import TitleBar from './custom-components/TitleBar';
import Button from 'react-bootstrap/Button';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Connect from './pages/Connect';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      <header>
        <TitleBar />
      </header>
      <body className='allContent'>
      <BrowserRouter>
        <Routes>  
            <Route path="/" element={Profile()} />  
            <Route path="/profile" element={Profile()} />
            <Route path="/messages" element={Messages()} /> 
            <Route path="/connect" element={Connect()} />
            <Route path="/settings" element={Settings()} />   
        </Routes>
      </BrowserRouter> 
      </body>
    </div>
  );
}

export default App;
