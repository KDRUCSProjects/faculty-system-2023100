import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
 
 
const RegisterForm = ({open, setOpen, state, setState}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passError, setPassError] = useState('')
    console.log(passError)
    const token = JSON.parse(localStorage.getItem('tokens'))


    // Register Users
    const registerUser = async (event) => {
    // event.preventDefault();
        const userData = {
            name: firstName + " " + lastName,
            email,
            password,
            role: 'user'
        }
        console.log(userData)
        try {
          const response = await axios.post('http://localhost:4000/users', userData, {
            headers: { Authorization: `Bearer ${token.access.token}` },
          });
          if(response){
            console.log('worked')
            setState(!state)
            setOpen(false)
          }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setPassError(error.response.data.message)
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        }
      };


    return (
        <React.Fragment>
            <h2>Register Teacher</h2>
            <div>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                        />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                        {/* <BasicSelect values = {roles} title = {'Role'} setRole = {setRole}/> */}
                <br/>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                    style={{marginBottom: 0}}
                />
                <p style = {{marginTop: 0, color: 'red'}}>{passError ? passError : ''}</p>
                <Button variant="outlined" color="secondary" onClick={(e)=>registerUser(e)} text = "Register Teacher" style = {{ width: '100%', height: 40, fontSize: 'bold'}}>{'Save'}</Button>
            </div>
     
        </React.Fragment>
    )
}
 
export default RegisterForm;