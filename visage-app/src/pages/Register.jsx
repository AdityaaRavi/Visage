import './page-styles.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Register(props){
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [noFileError, setNoFileError] = useState(true);
  const [file, setFile] = useState(null);


  // length of the arrays
  const [orgsLength, setOrgsLength] = useState(0);
  const [schoolsLength, setSchoolsLength] = useState(0);
  const [careerLength, setCareerLength] = useState(0);
  const [funLength, setFunLength] = useState(0);
  const [skillsLength, setSkillsLength] = useState(0);

  // states
  // 1 - login info, 2 - profile. On 2, the next button should say "Finish".
  const [pageNum, setPageNum] = useState(1);
  const [buttonName, setButtonName] = useState('Next');
  const [emailError, setEmailError] = useState(false);
  const [uniqueEmailError, setUniqueEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);



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
      // email should be between 1 - 70 characters, and should be a valid email address
      if (email.length > 100 || email.length < 1 || !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        setEmailError(true);
    } else {
        setEmailError(false);
    }
    // a valid password should have between 8 - 100 characters, atleast 1 number, 1 uppercase letter , 1 lowercase letter, and 1 special character.
    if (password.length > 100 || password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*~#^*&()_+{}|?&])[A-Za-z\d@$!%&*~#^*()_+{}|]{8,}$/)) {
        setPasswordError(true);
    } else {
        setPasswordError(false);
    }
  }, [email, password, name, description, orgs, schools, career, fun, skills]);

  const onChangeEmail = (e) => {
    if(e.target.value.length < 1) setEmail(' ');
    else setEmail(e.target.value.trim());
    setUniqueEmailError(false);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

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
      if (pageNum === 1) {
          // if the email is not used already, go to the next page
          axios.get('/isUniqueEmail', { params: { email: email } }).then((response) => {
              if (response.data === 'is_new') {
                setPageNum(2);
                setButtonName('Finish');
                setUniqueEmailError(false);
              } else {
                setUniqueEmailError(true);
              }
          });
      } else {  
        // making sure there are no errors in the input fields
        if (emailError || passwordError || nameError || descriptionError || lengthError || sizeError) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('orgs', orgs);
        formData.append('schools', schools);
        formData.append('career', career);
        formData.append('fun', fun);
        formData.append('description', description);
        formData.append('top4Skills', skills);
        

        axios
            .post('/createUser', formData)
            .then((response) => {
                if (response.data.short === 'success') {
                    console.log('Profile updated');
                    window.location.href = '/profile';
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
            });
      }
   }

    const onFileSelected = (e) => {
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
      <div className="container">
      <img src={`${process.env.PUBLIC_URL}\\Visage.png`}
              style={{width: '185px'}} alt="logo" />
      <h1> Register </h1>
      <br />
      <br />
      {(pageNum === 1) && 
          <div>
            <em>Step 1: Login Information</em>
            <div className="form-group">
                <label><em>Email</em></label>
                <input type="text" className="form-control" value={email} onChange={onChangeEmail} />
                {emailError && <span style={{color: 'red'}}>Should be a valid email address.</span>}
                <br />
                {uniqueEmailError && <span style={{color: 'red'}}>This email is already in use.</span>}
            </div>
            <br/>
            <div className="form-group">
                <label><em>Set Password:</em></label>
                <input type="password" className="form-control" value={password} onChange={onChangePassword} />
                {passwordError && 
                <span style={{color: 'red'}}>
                    Not a valid password. Make sure that your password:
                    <ul>
                        <li>Is between 8 - 100 characters</li>
                        <li>Has at least 1 number</li>
                        <li>Has at least 1 uppercase letter</li>
                        <li>Has at least 1 lowercase letter</li>
                        <li>Has at least 1 special character</li>
                    </ul>
                </span>
                }
            </div>
            <br/>
        </div>
      }
      {(pageNum === 2) && 
      <div className='profileEdit'>
          <em>Step 2: Profile Information</em>
          {
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
                    {(!skillsLength || skillsLength != 4) ? <span style={{color: 'red'}}>{skillsLength}/4 <br /> Four Skills are mandatory</span> : <span>{skillsLength}/4 </span>}
                </div>
                <br/>
                <div className="form-group">
                    <label><em>Profile Picture</em></label>
                    <br/>
                    <input onChange={onFileSelected} type="file" accept="image/jpg"></input>
                    <br/>
                    {sizeError && <span style={{color: 'red'}}> File size must be less than 1MB - {file.size/1000000}MB/1MB </span>}
                    {noFileError && <span style={{color: 'red'}}> Please select a file </span>}
                </div>
                </div>
            </div>
            }
        </div>
      }
      <br />
        <Button type="submit" 
                className="btn btn-primary" 
                onClick={onSubmit} 
        >
            {buttonName}
        </Button>
        <br />
        {(pageNum === 2) &&
            <Button type="submit"
                    className="btn btn-primary"
                    onClick={() => {setPageNum(1); setButtonName('Next');}} 
            >
                Back
            </Button>
        }
        <br />
      </div>
  );
}

export default Register;