import ProfileWhole from '../custom-components/ProfileWhole';
import { Button } from 'react-bootstrap';
import '../App.css'
import './page-styles.css';
import UserStats from '../custom-components/UserStats';

function Profile(){
  
  return (
    <div>
        <ProfileWhole id={6}/>
        <br />
        <Button variant="dark" class="editButton">Edit Profile</Button>
        <hr size="1" width="95%" color="black"/> 
        <UserStats id={6}/>
    </div>

   );
}

export default Profile;