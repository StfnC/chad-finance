import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Typography,
    TextField,
    Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { login } from '../actions/auth';
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"; */

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            // width: theme.spacing(60),
            // height: theme.spacing(20),
            backgroundColor: "#0df2c9",
        },
    },
    space: {
        margin: theme.spacing(1),
    },
}));

const Login = ({ login }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classe = useStyles();

    function onSubmit(event) {
        event.preventDefault();
        console.log("Email:", email, "Password: ", password);
        login(email, password);
        /* fetch("/api/")
         .then((response) => response.json())
         .then((data) => 
         console.log(data)
         ); */
    }

    return (
        <div className={classe.root}>
            <Paper>
                <Typography
                    className={classe.space}
                    align="center"
                    color="textPrimary"
                    variant="h2"
                >
                    Log in
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        className={classe.space}
                        label="Username"
                        variant="outlined"
                        placeholder="Nom d'utilisateur"
                        value={email}
                        onInput={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className={classe.space}
                        label="Mot de passe"
                        variant="outlined"
                        placeholder="Mot de passe"
                        type="password"
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
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
                    Pas encore de compte?{" "}
                    <Link to="/register">Créer un compte</Link>
                </p>
            </Paper>
        </div>
    );
}

export default connect(null, { login })(Login);