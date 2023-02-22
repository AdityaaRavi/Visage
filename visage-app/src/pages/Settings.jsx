import './page-styles.css';
// import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';


function Settings(props){

  const logOut = () => {
    // send AJAX request to log out
    axios.post('/logout', {session: localStorage.getItem('sessionId')}).catch((err) => {
      console.log(err);
    });
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionId');
  }
  
  return (
    <div>
        <h1> Settings </h1>
        {/* Button to log out */}
        <Button variant='primary' className='logoutButton' onClick={logOut} href='/'>
            Log Out
        </Button>
    </div>
   );
}

export default Settings;