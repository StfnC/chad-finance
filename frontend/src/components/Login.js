import React, { Component, useState} from 'react';
import { render } from 'react-dom';
import { Grid, Button, ButtonGroup, Typography, TextField, Paper } from "@material-ui/core";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"; */

 export default function Login (props) {
    const {classes} = props;
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
       function handleSubmit(event) {
            event.preventDefault();
            console.log( 'Email:', email, 'Password: ', password); 
           // You should see email and password in console.
           // ..code to submit form to backend here...
    
        }
    
        return( <div >
                <Paper>
                    <form onSubmit={handleSubmit} >
                        <TextField
                                              
                            value={email}
                            onInput={ e=>setEmail(e.target.value)}
                            
    
                        />
                        <TextField
                            
                            value={password}
                            onInput={ e=>setPassword(e.target.value)}
                            
                        />
                        <Typography />
                        <Button
                            type="submit"                            
                            
                        >
                            Login
                        </Button>
                    </form>
                    <p>
                        Pas encore de compte? <a href ="http://localhost:8000/admin">Regsiter</a>
                    </p>
                </Paper>
            </div>
        );
}
    
        
