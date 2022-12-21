import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';


function ProfileInfo(props){

    const profile = ((id) => {
        /* AJAX request goes here*/
        return({
            id: id,
            name: 'Adityaa Ravi',
            orgs: 'SacHacks, PayPal, Google DSC at UCD, UCD CS Tutoring Commitee',
            school: 'University of California, Davis',
            career: 'Full Stack Development, Machine Learning, Hackathons',
            fun: 'Biking, Travel, Badminton',
            description: 'I am currently looking for an Software Engineering Internship for Spring 2023.' + 
            ' Open to chat and connect!'
        })
    })(props.id)

  return (
    <div>
        <h2>{profile.name}</h2>
        <br/>
        <br/>
        <em>Organizations:</em> {profile.orgs} 
        <br/>
        <br/>
        <em>Alma Matter:</em> {profile.school} 
        <br/>
        <br/>
        <em>Career Interests:</em> {profile.career}
        <br/>
        <br/>
        <em>Idea of Fun:</em> {profile.fun}
        <br/>
        <br/>
        {profile.description}
    </div>
    );
}

export default ProfileInfo;