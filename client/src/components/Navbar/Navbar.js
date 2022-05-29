import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import decode from 'jwt-decode';


import useStyles from './styles';
import memories from '../../images/memories.png';
import {useDispatch} from 'react-redux';


const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const token = user?.token;

    const logOut = () => {
        dispatch({type: 'LOGOUT'});

        navigate("/");
        setUser(null);

    }


    useEffect(() => {
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    

    return (
            <AppBar className = {classes.appBar} position ="static" color ="inherit" >
            <div className = {classes.brandContainer}>

            <Typography  component = {Link} to = "/" variant="h4" className ={classes.heading}  align= "center"> 
            <div className = "typing-demo">Memories</div>
             </Typography>
            </div>
            <Toolbar className = {classes.toolbar}>
                {user ? (
                    <div className = {classes.profile}>
                        <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                <Typography className = {classes.userName} variant = "h6" >{user.result.name}</Typography>
                <Button variant = "contained" className = {classes.logout} color ="secondary" onClick = {logOut}>Log out</Button>
                    </div>
                ) : (
                    <Button component = {Link} to = "/auth" variant = "contained" className = {classes.logout} color ="primary">Sign in</Button>
                )}
            </Toolbar>
        
    </AppBar>
    
       
    );
};

export default Navbar;