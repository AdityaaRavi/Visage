import './page-styles.css';
import './login-page.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
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
        if(localStorage.getItem('userId') !== null){
            navigate("/profile");
            window.location.reload();
        }
    }, [])
    // Set the background image of the body component
    // useEffect(() => {
    //     document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1579624589315-5f5a5a5a5d5c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaHklMjBpbWFnZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&w=1000&q=80')";
    //     document.body.style.backgroundSize = "cover";
    //     document.body.style.backgroundPosition = "center";
    //     document.body.style.backgroundAttachment = "fixed";
    //     document.body.style.backgroundRepeat = "no-repeat";
    // }, [])
    let lineWidth = '95%';
    // if(props.inConnectionPage) lineWidth = '50%';
    let lineClass = '';
    return (
        // <div className="login-page">
        //     <div className="login">
        //         <h1>Visage - The Networking App Login</h1>
        //             {/* <input type="text" name="u" placeholder="Username" required="required" /> */}
        //             <input type="text" placeholder="Email" onChange={onChangeEmail}></input>
        //             {/* <input type="password" name="p" placeholder="Password" required="required" /> */}
        //             <input type="password" placeholder="Password" onChange={onChangePassword}></input>
        //             {/* <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button> */}
        //             <Button variant="primary" type="submit" onClick={onLoginClick} disabled={emailError || passwordError}>
        //                 Login
        //             </Button>
        //             {incorrectLogin && <p style={{color: 'red'}}>Incorrect email or password</p>}
        //             {(emailError || passwordError) && <p style={{color: 'red'}}>Please fill out all fields</p>}
        //     </div>
        // </div>


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
                    <Button className="submit-button" variant="primary" type="submit" onClick={onLoginClick} disabled={emailError || passwordError}>
                        Login
                    </Button>
                    {incorrectLogin && <p style={{color: 'red'}}>Incorrect email or password</p>}
                    {(emailError || passwordError) && <p style={{color: 'red'}}>Please fill out all fields</p>}
                </div>
                You are one button away from growing your network to the next level!
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
                <h1>How do start connecting with people on Visage?</h1>
                <div className='whyVisageText'>
                    <em> You can start connecting with people on Visage by creating an account! </em> <br /> <br />
                    When you create your account, we will ask you about your interests, skills, hobbies, and previous roles. 
                    After you create your account, Visage will use Artifical Intelligence to find people who you might want to connect with.
                    If you find their profile interesting, then you can connect with them by starting a conversation directly on the app, or decline the connection suggestion.
                    Based on if you connect with someone or not, Visage will learn more about your preferences and will be able to find more people you might want to connect with.
                </div>
            </div>
        </div>
    );
}

export default LoginPage;