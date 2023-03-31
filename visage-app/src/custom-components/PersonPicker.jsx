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
            .get(`/getSuggestedConnections/`, { params: {myId: props.myId, userId: props.id, session: props.session} })
            .then((response) => {
                // if not logged in, redirect to login page
                if (response.data === 'no_session_found') {
                    console.log('Not logged in');
                    // clear user Id and session Id from local storage and redirect to login page
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location.href = '/';
                    return;
                }
                setConnections(response.data);
                if(props.otherPersonId === -1 || props.otherPersonId === props.id) props.picker(connections[0].id);
    
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            axios
            .get(`/getExistingConnections/`, { params: {myId: props.myId, userId: props.id, session: props.session} })
            .then((response) => {
                // if not logged in, redirect to login page
                if (response.data === 'no_session_found') {
                    console.log('Not logged in');
                    // clear user Id and session Id from local storage and redirect to login page
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location.href = '/';
                    return;
                }
                setConnections(response.data);
                if(props.otherPersonId === -1 || props.otherPersonId === props.id) props.picker(connections[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        //if(connections.length > 0 && (props.otherPersonId === -1 || props.otherPersonId === props.id)) props.picker(connections[0].id);
    
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