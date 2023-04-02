import './page-styles.css';
// import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditProfile from '../custom-components/EditProfile';


function Settings(props){

  return (
    <div className='settingsPage'>
        <EditProfile myId={props.myId} id={props.id} session={props.session}/>
    </div>
   );
}

export default Settings;