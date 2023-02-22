import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProfileInfo(props){
    const [profile, setProfile] = useState();

    useEffect(() => {
        axios
           .get(`/getProfile/`, { params: {userId: props.id, session: props.session} })
           .then((response) => {
                if (response.data === 'Not logged in') {
                    console.log('Not logged in');
                    // clear user Id and session Id from local storage and redirect to login page
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location.href = '/';
                    return;
                }

                let data = response.data;
                // removing null elements from arrays
                data.orgs = data.orgs.filter((org) => org);
                data.schools = data.schools.filter((school) => school);
                data.career = data.career.filter((career) => career);
                data.fun = data.fun.filter((fun) => fun);

                setProfile(data);
           })
           .catch((err) => {
              console.log(err);
           });
     }, [props.id]);

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