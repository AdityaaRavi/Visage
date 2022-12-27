import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';


function UserStats(props){

    const profile = ((id) => {
        /* AJAX request goes here*/
        return({
            numConnections: 52,
            top4Skills: ['React.js', 'Tensorflow', 'Java', 'Leadership']
        })
    })(props.id)

  return (
    <div class='allStatsDisplay'>
        <div class='connectionsDisplay'>
            <img src={process.env.PUBLIC_URL + '/connections.svg'} />
            <em>Number of Connections:</em> {profile.numConnections} <br />
        </div>
        <div class='skillsDisplay'>
            <img src={process.env.PUBLIC_URL + '/skills.svg'} />
            <div class='skillList'>
                <em>Top Four Skills:</em>
                <br/>
                <ul>
                    {profile.top4Skills.map((skill) => <li>{skill}</li>)}
                </ul>
            </div>
        </div>
    </div>
    );
}

export default UserStats;