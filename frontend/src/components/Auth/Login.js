import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Typography, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
       // left: `${left}%`,
       // transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
              marginTop: theme.spacing(25),  
        },
    },
    space: {
        margin: theme.spacing(1),
    },
}));

const Login = ({ login, isAuthenticated }) => {
    // TODO: Ajouter une option remember me qui utilise le refresh token pour obtenir un nouveau access token chaque fois que l'utilisateur est loaded in

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classe = useStyles();
    const [modalStyle] = useState(getModalStyle);

    function onSubmit(event) {
        event.preventDefault();
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to="/" />;
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
                    Connexion
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        className={classe.space}
                        label="Courriel"
                        variant="outlined"
                        placeholder="Courriel"
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
                        Se connecter
                    </Button>
                </form>
                <p>
                    Pas encore de compte?{" "}
                    <Link to="/register">Créer un compte</Link>
                </p>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
