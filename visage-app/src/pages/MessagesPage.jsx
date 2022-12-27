import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState } from 'react';
import Messages from '../custom-components/Messages';

function MessagesPage(props){
  
  const [otherPersonId, setOtherPerson] = useState(2);
  return (
    <div id='MessagesPage'>
      <div class='personPicker'>
        <h1>Current Connections</h1>
        <PersonPicker id={props.id} picker={setOtherPerson}/>
      </div>
      <div class='VerticalDivider'></div>
      <div class='messagesHolder'>
        <div class='messageHolderLvl2'>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <Messages id={props.id} otherPersonId={otherPersonId}/>
        </div>
      </div>
    </div>
    );
}

export default MessagesPage;