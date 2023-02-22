import './page-styles.css';
import './login-page.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function LoginPage(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    const navigate = useNavigate();

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
                    //dispatch(login(response.data.userId))
                    localStorage.setItem('userId', response.data.userId)
                    localStorage.setItem('sessionId', response.data.sessionId)
                    setIncorrectLogin(false);
                    // Redirect to home page
                    navigate("/profile");
                    window.location.reload();


                }
                else setIncorrectLogin(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // If user is already logged in, redirect to profile page
    useEffect(() => {
        if(localStorage.getItem('sessionId') !== null){
            navigate("/profile");
            window.location.reload();
        }
    }, [])

    let lineWidth = '95%';
    // if(props.inConnectionPage) lineWidth = '50%';
    let lineClass = '';
    return (
        
        <MDBContainer className="my-5 gradient-form login">

        <MDBRow>

        <MDBCol col='6' className="mb-5 login">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src={`${process.env.PUBLIC_URL}\\visage.png`}
                style={{width: '185px'}} alt="logo" />
              {/* <h4 className="mt-1 mb-5 pb-1">Welcome to Visage</h4> */}
            </div>

            <p>Please login to your account</p>


            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={onChangeEmail}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={onChangePassword}/>
            {incorrectLogin && <p style={{color: 'red'}}>Incorrect email or password</p>}
            {(emailError || passwordError) && <p style={{color: 'red'}}>Please fill out all fields</p>}


            <div className="text-center pt-1 mb-5 pb-1">
                {/* <MDBBtn className="mb-4 w-100 gradient-custom-2" variant="primary" onClick={onLoginClick} >Sign in</MDBBtn> */}
                <Button className="submit-button mb-4 w-100 gradient-custom-2" variant="primary" type="submit" onClick={onLoginClick} disabled={emailError || passwordError}>
                    Login
                </Button>
                <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p> {' '}
                <Button className="mx-2" variant="dark" type="submit">
                    Register
                </Button>
            </div>

          </div>

        </MDBCol>

        {/* <MDBCol col='6' className="mb-5">
          {/* <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div> 
          <hr size="1" width={lineWidth} className={lineClass} color="black"/> 

          <div className='whyVisage'> 
                <h1>What is Visage?</h1>
                <div className='whyVisageText'>
                    Visage is an intelligent networking app that allows you to find people with similar interests 
                    and connect with them. While other networking applications are focused on connecting with people you already know,
                    Visage is focused on connecting you with people you don't know.
                </div>
                <br />
                <h1>How do I start connecting with people on Visage?</h1>
                <div className='whyVisageText'>
                    <em> You can start connecting with people on Visage by creating an account! </em> <br /> <br />
                    When you create your account, we will ask you about your interests, skills, hobbies, and previous roles. 
                    After you create your account, Visage will use Artifical Intelligence to find people who you might want to connect with.
                    If you find their profile interesting, then you can connect with them by starting a conversation directly on the app, or decline the connection suggestion.
                    Based on if you connect with someone or not, Visage will learn more about your preferences and will be able to find more people you might want to connect with.
                </div>
            </div>

        </MDBCol> */}

      </MDBRow>

    </MDBContainer>
    );
}

export default LoginPage;
