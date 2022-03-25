import React from 'react';
import logo from './musimoverlogo.svg';
import './Login.css';
import { makeStyles } from '@material-ui/core/styles';
import { loginUrl } from "./spotify";

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        backgroundColor: '#B19DFF',

        '& img':{
            width: '50%'
        },

        '& a':{
            padding: '20px',
            borderRadius: '99px',
            backgroundColor: '#1db954',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
        },

        '& a:hover':{
            backgroundColor:' white',
            borderColor: '#1db954',
            color: '#1db954',
        }
    },
});
function Login() {
    const classes = useStyles()
    return (
        <div className={classes.login}>
            <div className = "title-page">
                <h1 className = "edit-text"> MusiMover </h1>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login