import './page-styles.css';
import EditProfile from '../custom-components/EditProfile';
import EditLoginInfo from '../custom-components/EditLoginInfo';

function Settings(props){

  return (
    <div className='settingsPage'>
        <EditProfile myId={props.myId} id={props.id} session={props.session}/>
        <br />
        <br />
        <EditLoginInfo myId={props.myId} id={props.id} session={props.session}/>
    </div>
   );
}

export default Settings;