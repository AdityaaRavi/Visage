import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './component-styles.css';
//import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

function TitleBar(){
  
  return (
    <Navbar sticky='top' className='nav-bar'>
      <Container id="nav-container">
        <Navbar.Brand className="nav-item" id="nav-branding"> VISAGE - THE NETWORKING APP </Navbar.Brand>
        <Nav className="navbar-button-holder">
            <Nav.Link className="nav-item" id="profile-link" href="/profile">Profile</Nav.Link>
            <Nav.Link className="nav-item" id="messages-link" href="/messages">Messages</Nav.Link>
            <Nav.Link className="nav-item" id="connect-link">Connect</Nav.Link>
            <Nav.Link className="nav-item" id="settings-link">Settings</Nav.Link>
            {/* <MDBCol md="6">
              <form className="form-inline mt-4 mb-4">
                <MDBIcon icon="search" />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
              </form>
            </MDBCol> */}

        </Nav>
      </Container>
    </Navbar>
    );
}

export default TitleBar;