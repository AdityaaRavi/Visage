import './component-styles.css';
import '../pages/login-page.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';

function EditLoginInfo(props){

    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // states
    const [emailError, setEmailError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


    useEffect(() => {
        axios
              .get(`/getEmail/`, { params: {myId: props.myId, userId: props.id, session: props.session} })
                .then((response) => {
                    if (response.data === 'no_session_found') {
                        console.log('Not logged in');
                        // clear user Id and session Id from local storage and redirect to login page
                        localStorage.removeItem('userId');
                        localStorage.removeItem('sessionId');
                        window.location.href = '/';
                        return;
                    }
                    let data = response.data;
                    if (data != 'invalid_input') {
                        setEmail(data.email);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

    //check for errors in the input fields
    useEffect(() => {
        // email should be between 1 - 70 characters, and should be a valid email address
        if (email.length > 100 || email.length < 1 || !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (oldPassword.length > 100 || oldPassword.length < 8) {
            setOldPasswordError(true);
        } else {
            setOldPasswordError(false);
        }
        // a valid password should have between 8 - 100 characters, atleast 1 number, 1 uppercase letter , 1 lowercase letter, and 1 special character.
        if (newPassword.length > 100 || newPassword.length < 8 || !newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*~#^*&()_+{}|?&])[A-Za-z\d@$!%&*~#^*()_+{}|]{8,}$/)) {
            setNewPasswordError(true);
        } else {
            setNewPasswordError(false);
        }
        
    }, [email, newPassword, oldPassword]);

    const onChangeEmail = (e) => {
        if(e.target.value.length < 1) setEmail(' ');
        else setEmail(e.target.value.trim());
    }

    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
        //if (oldPasswordError) setOldPasswordError(false);
    }

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const onSubmit = (e) => {
        // making sure there are no errors in the input fields
        if (emailError || (changePassword && newPasswordError) || oldPasswordError) {
            return;
        }

        axios
            .post('/updateLogin',{
                                    myId: props.myId, 
                                    userId: props.id, 
                                    session: props.session, 
                                    email: email,
                                    oldPassword: oldPassword,
                                    newPassword: (changePassword) ? newPassword : ''
                                })
            .then((response) => {
                if (response.data === 'no_session_found') {
                    console.log('Not logged in');
                    // clear user Id and session Id from local storage and redirect to login page
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location.href = '/';
                    return;
                }
                if (response.data === 'success') {
                    console.log('Log-in details updated');
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='profileEdit'>
            <h1>Edit your Login Information </h1>
            {email &&
            <div>
                <br />
                <br />
                <br />
                <div className="form-group">
                    <label><em>Email</em></label>
                    <input type="text" className="form-control" value={email} onChange={onChangeEmail} />
                    {emailError && <span style={{color: 'red'}}>Should be a valid email address.</span>}
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Current Password:</em></label>
                    <input type="password" className="form-control" value={oldPassword} onChange={onChangeOldPassword} />
                    {oldPasswordError && <span style={{color: 'red'}}>Not a valid password.</span>}
                </div>
                <br/>
                <Button type="toggle" onClick={() => setChangePassword(!changePassword)} className="btn btn-secondary">Change Password</Button>
                <br/>
                <br/>
                {changePassword &&
                <div className="form-group">
                    <label><em>New Password:</em></label>
                    <input type="password" className="form-control" value={newPassword} onChange={onChangeNewPassword} />
                    {newPasswordError && 
                    <span style={{color: 'red'}}>
                        Not a valid password. Make sure that your password:
                        <ul>
                            <li>Is between 8 - 100 characters</li>
                            <li>Has at least 1 number</li>
                            <li>Has at least 1 uppercase letter</li>
                            <li>Has at least 1 lowercase letter</li>
                            <li>Has at least 1 special character</li>
                        </ul>
                    </span>}
                </div>
                }
                <br/>
                
                <br />
                <Button type="submit" 
                        className="btn btn-primary" 
                        onClick={onSubmit} 
                        disabled={emailError || oldPasswordError || (changePassword && newPasswordError)}
                >
                    Submit
                </Button>
                <br />
                {success && <span style={{color: 'green'}}>
                    Log-in details updated!
                </span>}

            </div>
            }
        </div>
    );
}

export default EditLoginInfo;

/// NOTE: Use recursion instead of an FTS while trying to find unique user and session ids
// this way, you can still work around the issues caused by how promises work and how we can't
// use async/await. Key words: Recursion, higher orgder funtions, avoid Full Table Scans.