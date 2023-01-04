import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

function PersonPicker(props){

    const [connections, setConnections] = useState([]);

    const getConnections = (id, getNew) => {
        /* AJAX request goes here*/

        let connections = [
            {id: 1, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 2, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 3, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 4, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 5, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 6, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 7, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 8, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 9, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 10, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 11, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 12, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 13, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 14, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 153, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 161, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 172, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 183, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},
            {id: 191, name: 'John Doe', orgs: ['SacHacks'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Machine Learning'], fun: ['Biking', 'Badminton'], description: 'Open to chat and connect!'},
            {id: 220, name: 'Jane Doe', orgs: ['Google DSC at UCD', 'UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Machine Learning', 'Hackathons'], fun: ['Travel', 'Badminton'], description: 'Open to discussing about Machine Learning and Hackathons!'},
            {id: 321, name: 'John Smith', orgs: ['UCD CS Tutoring Commitee'], schools: ['University of California, Davis'], career: ['Full Stack Development', 'Hackathons'], fun: ['Biking', 'Travel'], description: 'Open to discussing about Full Stack Development and Hackathons!'},

        ]

        if(getNew){
            // Get new connections
            console.log(`Returning suggested connections for ${id}`)
        }
        else{
            // Get exisiting connections
            console.log(`Returning existing connections of ${id}`)
        }

        return(connections);
    };
    useEffect(() => setConnections(getConnections(props.id, props.getNew)), []);

  return (
    <div>
    <ListGroup className='peoplePicker'>
        {connections.map((connection) => {
            return(
                <ListGroup.Item 
                    action 
                    onClick={() => props.picker(connection.id)}
                    active={props.otherPersonId === connection.id}
                >
                    {/* <Image src='https://via.placeholder.com/150' roundedCircle /> */}
                    <em>{connection.name}</em>
                    <br />
                    {connection.orgs.map((org) => {return(<div><Badge class="badge-theme" variant='dark'>{org}</Badge>{' '}</div>)})}
                </ListGroup.Item>
            );
        })}
    </ListGroup>
    </div>
    );
}

export default PersonPicker;