import Container from 'react-bootstrap/Container';
import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
import UserStats from './UserStats';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
// import axios from 'axios';

function ProfileWhole(props){
    let className = 'profile-viewport';
    if(props.inConnectionPage) className += ' alwaysPotrait';
    // http://localhost:3001/${props.id}.jpeg
    // const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/placeholder.jpg`);

    // place a call to the '/getProfilePicPath' endpoint to get the profile pic path for this user
    // if the user has a profile pic, set the profile pic state to the path
    // axios.get(`/getProfilePicPat/${props.id}`).then((response) => {
    //     if(response.data.message === 'success'){
    //         setProfilePic(response.data.profilePicPath);
    //     }
    // }).catch((error) => {
    //     console.log(error);
    // });

    return (
        <div className='halfPageComponent'>
            {!props.inConnectionPage && <h1 className='pageHeading'>Your Profile</h1>}
            {/* {props.inConnectionPage && <h1 className='pageHeading'>Their Profile</h1>} */}
            <div className={className}>
                <img
                    src={`http://localhost:3001/${props.id}.jpeg`}
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

