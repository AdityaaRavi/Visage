import './component-styles.css';
import '../pages/login-page.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';

function EditProfile(props){

    const [profile, setProfile] = useState(null);
    const [orgs, setOrgs] = useState([]);
    const [schools, setSchools] = useState([]);
    const [career, setCareer] = useState([]);
    const [fun, setFun] = useState([]);
    const [skills, setSkills] = useState([]);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [lengthError, setLengthError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [success, setSuccess] = useState(false);

    // length of the arrays
    const [orgsLength, setOrgsLength] = useState(0);
    const [schoolsLength, setSchoolsLength] = useState(0);
    const [careerLength, setCareerLength] = useState(0);
    const [funLength, setFunLength] = useState(0);
    const [skillsLength, setSkillsLength] = useState(0);


    useEffect(() => {
        axios
              .get(`/getProfile/`, { params: {myId: props.myId, userId: props.id, session: props.session} })
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
                        // removing null elements from arrays
                        data.orgs = data.orgs.filter((org) => org);
                        data.schools = data.schools.filter((school) => school);
                        data.career = data.career.filter((career) => career);
                        data.fun = data.fun.filter((fun) => fun);

                        setProfile(data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        axios.get('/userStats', { params: {myId: props.id, userId: props.id, session: props.session} })
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
                    setSkills(data.top4Skills);
                }
            });
    }, []);

    useEffect(() => {
        if (profile && skills) {
            setOrgs(profile.orgs);
            setOrgsLength(profile.orgs.length);

            setSchools(profile.schools);
            setSchoolsLength(profile.schools.length);

            setCareer(profile.career);
            setCareerLength(profile.career.length);

            setFun(profile.fun);
            setFunLength(profile.fun.length);

            setDescription(profile.description);
            setName(profile.name);

            setSkillsLength(skills.length);
        }
    }, [profile, skills]);

    //check for errors in the input fields
    useEffect(() => {
        if (name.length > 70 || name.length < 1) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        if (description.length > 300 || description.length < 1) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
        if (orgsLength > 5 || schoolsLength > 4 || careerLength > 4 || funLength > 4 || skillsLength !== 4 ||
            orgsLength < 1 || schoolsLength < 1 || careerLength < 1 || funLength < 1) {
            setLengthError(true);
        } else {
            setLengthError(false);
        }
    }, [name, description, orgs, schools, career, fun, skills]);


    const onChangeOrgs = (e) => {
        setOrgs(e.target.value.split(',').map((x) => x.replace(/^\s+/, "")));
        setOrgsLength(e.target.value.split(',').length);
        if(orgs[0] === '') setOrgsLength(0);
    }

    const onChangeSkills = (e) => {
        setSkills(e.target.value.split(',').map((x) => x.replace(/^\s+/, "")));
        setSkillsLength(e.target.value.split(',').length);
        if(skills[0] === '') setSkillsLength(0);
    }

    const onChangeSchools = (e) => {
        setSchools(e.target.value.split(',').map((x) => x.replace(/^\s+/, "")));
        setSchoolsLength(e.target.value.split(',').length);
        if(schools[0] === '') setSchoolsLength(0);
    }

    const onChangeCareer = (e) => {
        setCareer(e.target.value.split(',').map((x) => x.replace(/^\s+/, "")));
        setCareerLength(e.target.value.split(',').length);
        if(career[0] === '') setCareerLength(0);
    }

    const onChangeFun = (e) => {
        setFun(e.target.value.split(',').map((x) => x.replace(/^\s+/, "")));
        setFunLength(e.target.value.split(',').length);
        if(fun[0] === '') setFunLength(0);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        // making sure there are no errors in the input fields
        if (nameError || descriptionError || lengthError) {
            return;
        
        }

        axios
            .post('/updateProfile',{
                                    myId: props.myId, 
                                    userId: props.id, 
                                    session: props.session, 
                                    orgs: orgs, 
                                    schools: schools, 
                                    career: career, 
                                    fun: fun, 
                                    description: description, 
                                    name: name, 
                                    top4Skills: skills,
                                    email: profile.email
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
                    console.log('Profile updated');
                    setSuccess(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='profileEdit'>
            <h1>Edit your profile </h1>
            {profile && skills &&
            <div>
                <br />
                (Basic Information)
                <br />
                <br />
                <div className="form-group">
                    <label><em>Name</em></label>
                    <input type="text" className="form-control" value={name} onChange={onChangeName} />
                    {(nameError) ? <span style={{color: 'red'}}>{name.length}/70</span> : <span>{name.length}/70</span>}
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Description</em></label>
                    <textarea className="form-control" value={description} onChange={onChangeDescription} />
                    {(descriptionError) ? <span style={{color: 'red'}}>{description.length}/300</span> : <span>{description.length}/300</span>}
                </div>
                <br/>

                (Interests and History: Provide the following as comma separated values)
                <br />
                <br />
                
                <div className="form-group">
                    <label><em>Organizations</em></label>
                    <input type="text" className="form-control" value={orgs.map((x) => " " + x)} 
                    onChange={onChangeOrgs} 
                    onLoad={onChangeOrgs} 
                    onFocus={onChangeOrgs}
                    onBlur={onChangeOrgs}/>
                    {(!orgsLength || orgsLength < 1 || orgsLength > 4) ? <span style={{color: 'red'}}>{orgsLength}/4 </span> : <span>{orgsLength}/4 </span>}
                
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Alma Matter</em></label>
                    <input type="text" className="form-control" value={schools.map((x) => " " + x)} 
                    onChange={onChangeSchools} 
                    onLoad={onChangeSchools} 
                    onFocus={onChangeSchools}
                    onBlur={onChangeSchools}/>
                    {(!schoolsLength || schoolsLength < 1 || schoolsLength > 3) ? <span style={{color: 'red'}}>{schoolsLength}/3 </span> : <span>{schoolsLength}/3 </span>}
                
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Career Interests</em></label>
                    <input type="text" className="form-control" value={career.map((x) => " " + x)} 
                    onChange={onChangeCareer} 
                    onLoad={onChangeCareer} 
                    onFocus={onChangeCareer}
                    onBlur={onChangeCareer}/>
                    {(!careerLength || careerLength < 1 || careerLength > 3) ? <span style={{color: 'red'}}>{careerLength}/3 </span> : <span>{careerLength}/3 </span>}
                
                <div className="form-group">
                    <label> <em>Ideas of fun:</em></label>
                    <input type="text" className="form-control" value={fun.map((x) => " " + x)} 
                    onChange={onChangeFun} 
                    onLoad={onChangeFun} 
                    onFocus={onChangeFun}
                    onBlur={onChangeFun}/>
                    {(!funLength || funLength < 1 || funLength > 3) ? <span style={{color: 'red'}}>{funLength}/3 </span> : <span>{funLength}/3 </span>}
                
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Skills</em></label>
                    <input type="text" className="form-control" value={skills.map((x) => " " + x)} 
                    onChange={onChangeSkills} 
                    onLoad={onChangeSkills} 
                    onFocus={onChangeSkills}
                    onBlur={onChangeSkills}
                    />
                    {(!skillsLength || skillsLength != 4) ? <span style={{color: 'red'}}>{skillsLength}/4 <br /> You must enter exactly four skills </span> : <span>{skillsLength}/4 </span>}
                
                </div>
                <br/>
                </div>
                
                <br />
                <Button type="submit" 
                        className="btn btn-primary" 
                        onClick={onSubmit} 
                        disabled={nameError || descriptionError || lengthError}
                >
                    Submit
                </Button>
                <br />
                {success && <span style={{color: 'green'}}>
                    Profile updated
                </span>}

            </div>
            }
        </div>
    );
}

export default EditProfile;