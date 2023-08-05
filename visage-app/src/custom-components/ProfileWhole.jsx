import Container from 'react-bootstrap/Container';
import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
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
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=`${process.env.PUBLIC_URL}/placeholder.jpg`;
                      }}
                />
                <ProfileInfo id={props.id} myId={props.myId} session={props.session}/>
            </div>
            
        </div>
        );
}

export default ProfileWhole;

