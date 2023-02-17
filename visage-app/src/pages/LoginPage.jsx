import './page-styles.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux'
import { login, logOut } from '../redux-slices/userIdSlice'

function LoginPage(props){
    const id = useSelector((state) => state.userId.value)
    const dispatch = useDispatch()
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
                    dispatch(login(response.data.userId))
                    setIncorrectLogin(false);
                }
                else setIncorrectLogin(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="login-page">
            <div className="login-page-content">
                <div className="login-page-title">
                    <h1>Visage - The Networking App</h1>
                </div>
                <div className="login-page-form">
                    <div className="login-page-form-input">
                        <input type="text" placeholder="Email" onChange={onChangeEmail}></input>
                    </div>
                    <div className="login-page-form-input">
                        <input type="password" placeholder="Password" onChange={onChangePassword}></input>
                    </div>
                    <Button variant="primary" type="submit" onClick={onLoginClick} disabled={emailError || passwordError}>
                        Login
                    </Button>
                    {incorrectLogin && <p style={{color: 'red'}}>Incorrect email or password</p>}
                    {(emailError || passwordError) && <p style={{color: 'red'}}>Please fill out all fields</p>}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;