// import React, {useState} from "react";
import { useState } from "react";
import { TextField, FormControl, Button, FormHelperText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom"
import '../Styles/loginCard.css'
import axios, { AxiosError } from 'axios'
 
const Login = ({setLogged}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [unAuthError, setUnAuthError] = useState(null)

    const [data,setData]=useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email, password)
        setEmailError(false)
        setPasswordError(false)
        console.log(data)
 
        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
 
        if (email && password) {

            axios.post(`http://localhost:4000/auth/login`, {
                    password,
                    email
                }
            )
            .then(({data})=>{
              setData(data)
              localStorage.setItem('tokens',JSON.stringify(data.tokens))
              localStorage.setItem('user', JSON.stringify(data.user.role))
              if(data.tokens.access.token){
                  setUnAuthError(null)
                  setLogged(true)
              }               
            })
            .catch(err=>{
                if(err.response.status){
                    setUnAuthError('You are Unauthorized person. Please register yourself to system')
                }
            })
        }
    }
     
    return ( 
        <div className="login-card">
            
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2 className="login-header">Sign In</h2>
                {unAuthError && <FormHelperText sx={{color:'red', textAlign:'center',fontSize:'20px' }}>{unAuthError}</FormHelperText> }
                <TextField 
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        <small>Need an account? <Link to="/">Register here</Link></small>
        </div>
     );
}
 
export default Login;


