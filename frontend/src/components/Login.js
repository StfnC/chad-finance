import React, { Component, useState} from 'react';
import { render } from 'react-dom';
import { Grid, Button, Typography, TextField, Paper, Container, makeStyles} from "@material-ui/core";
import { lightBlue, lightGreen } from '@material-ui/core/colors';
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"; */


const useStyles = makeStyles((theme) => ({
    root:{
        "& > *": {
       // width: theme.spacing(60),
       // height: theme.spacing(20),
        backgroundColor: lightGreen[50],
        },
       
    },
    space:{
        margin: theme.spacing(1),
    }
    

}));


 export default function Login (props) {
    const {classes} = props;
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const classe = useStyles();
    
       function handleSubmit(event) {
            event.preventDefault();
            console.log( 'Email:', email, 'Password: ', password); 
           
           /* fetch("/api/")
            .then((response) => response.json())
            .then((data) => 
            console.log(data)
            ); */
     
        }

    
        return( <div className={classe.root}>
          
                <Paper >
                    <Typography className={classe.space} align= "center" color="textPrimary" variant ="h2">Log in</Typography>
                    <form onSubmit={handleSubmit} >
                        <TextField
                           className={classe.space}
                           label="Username"
                           variant ="outlined"      
                           placeholder="nom d'utilisateur"             
                           value={email}
                           onInput={ e=>setEmail(e.target.value)}
                           
                            
    
                        />
                        <TextField
                            className={classe.space}
                            label = "Mot de passe"
                            variant = "outlined"
                            placeholder = "Mot de passe"
                            value={password}
                            onInput={ e=>setPassword(e.target.value)}
                            
                        />
                        <Typography />
                        <Button
                            className={classe.space}
                            type="submit"    
                            variant="contained" 
                            color="primary"                                                  
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
    
        
