import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState, useEffect } from 'react';
import Messages from '../custom-components/Messages';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function MessagesPage(props){
  
  const [otherPersonId, setOtherPerson] = useState(2);

  const onRemoveConnectionButtonClick = (e) => {
    /* AJAX call to remove connection */
    axios.post('/removeConnection', {userId: props.id, otherPersonId: otherPersonId})
         .then((response) => {
            //console.log(response.data);
            setOtherPerson(-1);
          });         
  }

  return (
    <div id='MessagesPage'>
      <div class='personPicker'>
        <h1>Current Connections</h1>
        <PersonPicker className='personPickerComponent' id={props.id} picker={setOtherPerson} otherPersonId={otherPersonId} getNew={false}/>
      </div>
      <div class='VerticalDivider'></div>
        <div class='messageHolderLvl2'>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <Messages id={props.id} otherPersonId={otherPersonId} />
          <div>
            <Button variant='primary' 
            className='removeConnectionButton'
            onClick={onRemoveConnectionButtonClick} >
              Remove Connection
            </Button>
          </div>
        </div>
    </div>
    );
}

export default MessagesPage;