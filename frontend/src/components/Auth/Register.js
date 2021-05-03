import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Typography, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            marginTop : theme.spacing(20),
        },
    },
    space: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    rightBorder: {
        marginRight: theme.spacing(2),
    },
}));

const Register = ({ register, isAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    const classe = useStyles();

    function onSubmit(event) {
        event.preventDefault();
        register(email, firstName, lastName, password, password2);
        // TODO: Eventuellement afficher des messages de succes ou d'erreur et rediriger seulement en cas de succes
        history.push("/login"); // Redirige vers /login
    }

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    // TODO: Utiliser Grid pour les formulaires
    // TODO: Fix le layout
    return (
        <div className={classe.root}>
            <Paper>
                <Typography
                    className={classe.space}
                    align="center"
                    color="textPrimary"
                    variant="h2"
                >
                    Créer un compte
                </Typography>
                <form onSubmit={onSubmit}>
                    <div className={classe.rightBorder}>
                        <div>
                            <TextField
                                className={classe.space}
                                label="Email"
                                variant="outlined"
                                placeholder="Email"
                                value={email}
                                fullWidth
                                margin="normal"
                                onInput={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                className={classe.space}
                                label="Prénom"
                                variant="outlined"
                                placeholder="Prénom"
                                value={firstName}
                                onInput={(e) => setFistName(e.target.value)}
                            />
                            <TextField
                                className={classe.space}
                                label="Nom de famille"
                                variant="outlined"
                                placeholder="Nom de famille"
                                value={lastName}
                                onInput={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                className={classe.space}
                                label="Mot de passe"
                                variant="outlined"
                                placeholder="Mot de passe"
                                type="password"
                                value={password}
                                onInput={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                className={classe.space}
                                label="Confirmation du mot de passe"
                                variant="outlined"
                                placeholder="Répétez votre mot de passe"
                                type="password"
                                value={password2}
                                onInput={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classe.space}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Créer un compte
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
