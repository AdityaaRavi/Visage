import Container from 'react-bootstrap/Container';
import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
//import image from './adityaa-ravi.png';
import UserStats from './UserStats';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function ProfileWhole(props){
    let className = 'profile-viewport';
    if(props.inConnectionPage) className += ' alwaysPotrait';

    return (
        <div className='halfPageComponent'>
            {!props.inConnectionPage && <h1 className='pageHeading'>Your Profile</h1>}
            {/* {props.inConnectionPage && <h1 className='pageHeading'>Their Profile</h1>} */}
            <div className={className}>
                <img
                    src={`${process.env.PUBLIC_URL}/userContent/${props.id}.jpg`}
                    class='img-rounded'
                    id='profile-pic'
                    alt='...'
                />
                <ProfileInfo id={props.id} session={props.session}/>
            </div>
            
        </div>
        );
}

export default ProfileWhole;

