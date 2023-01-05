import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

function PersonPicker(props){

    const [connections, setConnections] = useState([]);

    useEffect(() => {
        if(props.getNew){
            axios
            .get(`/getSuggestedConnections/`, { params: {userId: props.id} })
            .then((response) => {
                setConnections(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            axios
            .get(`/getExistingConnections/`, { params: {userId: props.id} })
            .then((response) => {
                setConnections(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        if(props.otherPersonId === -1) props.picker(connections[0].id);
    
    }, [props.otherPersonId]);

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