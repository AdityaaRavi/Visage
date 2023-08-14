import './component-styles.css';
import '../pages/login-page.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';

function UpdateImage(props){

    const [sizeError, setSizeError] = useState(false);
    const [noFileError, setNoFileError] = useState(true);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);


    const onSubmit = (e) => {
        // making sure there are no errors in the input fields
        if (sizeError || !file) {
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("myId", props.myId);
        formData.append("userId", props.id);
        formData.append("session", props.session);

        axios.post('/updateProfilePicture', formData, { headers: {'Content-Type': 'multipart/form-data'}})
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
                    // console.log('Profile Picture updated');
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fileSelected = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setNoFileError(false);
        if (file.size > 1000000) {
            setSizeError(true);
        }else{
            setSizeError(false);
        }
    }

    return (
        <div className='profileEdit'>
            <h1>Edit your profile picture </h1>
                <div className="form-group">
                    <br />
                    <input onChange={fileSelected} type="file" accept="image/jpg"></input>
                    <br/>
                    {sizeError && <span style={{color: 'red'}}> File size must be less than 1MB - {file.size/1000000}MB/1MB </span>}
                    {noFileError && <span style={{color: 'red'}}> Please select a file </span>}
                </div>
                <br />
                <Button type="submit" 
                        className="btn btn-primary" 
                        onClick={onSubmit} 
                        disabled={sizeError || !file}
                >
                    Update
                </Button>
                <br />
                {success && <span style={{color: 'green'}}>
                    Profile picture updated
                </span>}
        </div>
    );
}

export default UpdateImage;