import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState, useEffect } from 'react';
import MessagesInputBox from '../custom-components/MessageInputBox';
import Profile from './Profile';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ConnectPage(props){
  
  const [otherPersonId, setOtherPerson] = useState(2);

  const onDeclineConnectionButtonClick = (e) => {
    /* AJAX call to remove connection */
    axios.post('/declineSuggestion', {userId: props.id, otherPersonId: otherPersonId})
         .then((response) => {
            console.log(response.data);
            setOtherPerson(-1);
          });         
  }

  return (
    <div id='ConnectionsPage'>
      <div class='personPicker'>
        <h1>Suggested Connections</h1>
        <PersonPicker className='personPickerComponent' id={props.id} picker={setOtherPerson} otherPersonId={otherPersonId} getNew={true}/>
      </div>
      <div class='VerticalDivider'></div>
        <div class='messageHolderLvl2'>
          <Profile id={otherPersonId} inConnectionPage={true}/>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <div>Start a conversation:</div>
          <MessagesInputBox id={props.id} otherPersonId={otherPersonId} />
          <div>
            <Button variant='primary' 
            className='declineConnectionButton'
            onClick={onDeclineConnectionButtonClick} >
              Decline Connection Suggestion
            </Button>
          </div>
        </div>
    </div>
    );
}

export default ConnectPage;