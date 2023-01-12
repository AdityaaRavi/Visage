import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


function UserStats(props){
    const [userStats, setUserStats] = useState();

    useEffect(() => {
        axios
           .get(`/userStats/`, { params: {userId: props.id} })
           .then((response) => {
                setUserStats(response.data);
           })
           .catch((err) => {
              console.log(err);
           });
     }, [[props.id]]);

  return (
    <div class='allStatsDisplay'>
        <div class='connectionsDisplay'>
            {!props.inConnectionPage &&
                <img src={process.env.PUBLIC_URL + '/connections.svg'} />
            }
            <em>Number of Connections:</em> {userStats && userStats.numConnections} <br />
        </div>
        <div class='skillsDisplay'>
            {!props.inConnectionPage &&
                <img src={process.env.PUBLIC_URL + '/skills.svg'} />
            }
            <div class='skillList'>
                <em>Top Four Skills:</em>
                <br/>
                <ul>
                    {userStats && userStats.top4Skills.map((skill) => <li>{skill}</li>)}
                </ul>
            </div>
        </div>
    </div>
    );
}

export default UserStats;