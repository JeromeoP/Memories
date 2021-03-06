import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Icon from './icon';
import { useNavigate } from "react-router-dom";
import Input from './Input';

import {signin, signup} from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
            e.preventDefault();

            if(isSignUp) {
                dispatch(signup(formData, navigate));


            }else {
                dispatch(signin(formData, navigate));

            }
    }
    const handleChange = (e) => {
        setFormData({ ... formData, [e.target.name]: e.target.value})

    }
    const switchMode = ()=> {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(result);

        try {
            dispatch({type: 'AUTH', data: {result, token}});
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful.");
    }


    return (
      <Container component ="main" maxWidth ="xs">
          <Paper className = {classes.paper} elevation = {3}>
              <Avatar className = {classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
             <Typography variant = "h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
             <form className = {classes.form} onSubmit={handleSubmit}>
                <Grid container spacing = {2}>
                    {   isSignUp && (
                        <> 
                        <Input name = "firstName" label = "First Name" handleChange = {handleChange} autoFocus half />
                        <Input name = "lastName" label = "Last Name" handleChange = {handleChange}  half />

                        </>
                    )}
                    <Input name = "email" label = "Email Address" handleChange = {handleChange} type = "email" />
                    <Input name = "password" label = "Password" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
                    {
                        isSignUp && <Input name = "confirmPassword" label = "Repeat Password" handleChange = {handleChange} type = "password"/>

                    }
                </Grid>
            
                <Button type = "submit" fullWidth variant = "contained" color = "inherit" className = {classes.submit}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin 
           

                render={(renderProps)=> (
                    <Button
                    className = {classes.googleButton} 
                    color = "inherit" 
                    fullWidth 
                    onClick = {renderProps.onClick} 
                    disabled = {renderProps.disabled} 
                    startIcon = {<Icon />} 
                    variant = "contained" 
                    >
                        Google Sign In
                    </Button>
                )}
                clientId = {"977953374598-phtp1rho9h4fn71d0ettf90gnku0dn2d.apps.googleusercontent.com"}
                cookiePolicy={'single_host_origin'}
                prompt ={'consent'}
                onSuccess = {googleSuccess}
                onFailure = {googleFailure}

                />
                    <Grid container justifyContent = "flex-end">
                        <Grid item>
                            <Button onClick = {switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
             </form>
          </Paper>
      </Container>

    );
};

export default Auth;