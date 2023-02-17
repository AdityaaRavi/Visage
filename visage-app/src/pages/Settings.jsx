import './page-styles.css';
// import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux'
// import { login, logOut } from '../redux-slices/userIdSlice'

function Settings(){

  const logOut = () => {
    localStorage.removeItem('userId');
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