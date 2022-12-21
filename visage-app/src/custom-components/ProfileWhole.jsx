import Container from 'react-bootstrap/Container';
import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
//import image from './adityaa-ravi.png';


function ProfileWhole(props){
  return (
    <div>
        <h1 className='pageHeading'>Your Profile</h1>
        <div class='profile-viewport'>
            <img
                src={process.env.PUBLIC_URL + '/userContent/adityaa-ravi.jpg'}
                class='img-rounded'
                id='profile-pic'
                alt='...'
            />
            <ProfileInfo id={props.id}/>
        </div>
        
    </div>
    );
}

export default ProfileWhole;