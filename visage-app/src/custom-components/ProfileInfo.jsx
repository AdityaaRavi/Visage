import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProfileInfo(props){
    const [profile, setProfile] = useState();

    useEffect(() => {
        axios
           .get(`/getProfile/`, { params: {userId: props.id} })
           .then((response) => {
                setProfile(response.data);
           })
           .catch((err) => {
              console.log(err);
           });
     }, []);

    // const profile = ((id) => {
    //     /* AJAX request goes here*/
    //     return({
    //         id: id,
    //         name: 'Adityaa Ravi',
    //         orgs: ['SacHacks', 'PayPal', 'Google DSC at UCD', 'UCD CS Tutoring Commitee'],
    //         schools: ['University of California, Davis'],
    //         career: ['Full Stack Development', 'Machine Learning', 'Hackathons'],
    //         fun: ['Biking', 'Travel', 'Badminton'],
    //         description: 'I am currently looking for an Software Engineering Internship for Spring 2023.' + 
    //         ' Open to chat and connect!',
    //     })
    // })(props.id)

  return (
    <div>
        {profile && <div>
            <h2>{profile.name}</h2>
            <br/>
            <br/>
            <em>Organizations:</em> {profile.orgs.join(', ')} 
            <br/>
            <br/>
            <em>Alma Matter:</em> {profile.schools.join(', ')} 
            <br/>
            <br/>
            <em>Career Interests:</em> {profile.career.join(', ')}
            <br/>
            <br/>
            <em>Idea of Fun:</em> {profile.fun.join(', ')}
            <br/>
            <br/>
            {profile.description}
        </div>}
    </div>
    );
}

export default ProfileInfo;