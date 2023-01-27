import React, { useState } from 'react';  
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import TitleBar from './custom-components/TitleBar';
import Button from 'react-bootstrap/Button';
import Profile from './pages/Profile';
import MessagesPage from './pages/MessagesPage';
import ConnectPage from './pages/ConnectPage';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/LoginPage';

function App() {
  /* enivornment variable for the current user */
  const [id, setId] = useState(-1);

  /* Login handlers */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const onChangeEmail = (e) => {
      setEmail(e.target.value);
      if(e.target.value === ''){
          setEmailError(true);
      }else{
          setEmailError(false);
      }
  }

  const onChangePassword = (e) => {
      setPassword(e.target.value);
      if(e.target.value === ''){
          setPasswordError(true);
      }else{
          setPasswordError(false);
      }
  }

  const onLoginClick = (e) => {
      axios.post('/login', {email: email, password: password})
          .then((response) => {
              console.log(response);
              if(response.data.message === 'success'){
                  setId(response.data.userId);
                  setIncorrectLogin(false);
              }
              else setIncorrectLogin(true);
          })
          .catch((error) => {
              console.log(error);
          });
  }

  return (
    <div className="App">
      <header>
        {id !== -1 && <TitleBar />}
      </header>
      <body className='allContent'>
      <BrowserRouter>
        <Routes>
            {/* If not logged in, only the login component should be shown regardless of path */}
            {/* 
              When LoginPage changes the id from -1 to the user's actual id, it only ends up changing
              in that route. The other routes still have the old id. Need to figure out how to fix this.

              One way is to handle the login in the App.js file instead of the LoginPage.js file... But it is not ideal.
            */}

            <Route path="/" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <Profile id={id}/>} 
            />
            {/* If not logged in, only the login component should be shown regardless of path */}
            <Route path="/profile" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <Profile id={id}/>} 
            />

            <Route path="/messages" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <MessagesPage id={id}/>} />

            <Route path="/connect" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <ConnectPage id={id}/>} />

            <Route path="/settings" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <Settings id={id}/>} />

            <Route path="/editProfile" element={id === -1 ? <LoginPage 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                incorrectLogin={incorrectLogin}
                setIncorrectLogin={setIncorrectLogin}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onLoginClick={onLoginClick} 
              /> : <Settings id={id}/>/*<EditProfile id={id}/>*/} />   
        </Routes>
      </BrowserRouter> 
      </body>
    </div>
  );
}

export default App;
