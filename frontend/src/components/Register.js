import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Typography, TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

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

const Register = ({ isAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const classe = useStyles();

    const register = async () => {
        // FIXME: Seulement pour test, remplacer les console.log et alert par de la logique et des messages pour l'utilisateur sur le site, redirect l'utilisateur
        // TODO: Remplacer le base url par une variable dans .env
        const url = "http://localhost:8000/auth/users/";
        const body = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                re_password: password2,
            }),
        };

        try {
            const res = await fetch(url, body);
            const res_json = await res.json();

            if (res.ok) {
                alert("Le compte a été créé, vérifiez votre email");
            } else {
                // FIXME: Très hacky
                alert(
                    `Il y a eu un problème: ${JSON.stringify(await res_json)}`
                );
            }
        } catch (error) {
            console.log("Error during fetch");
        }
    };

    function onSubmit(event) {
        event.preventDefault();
        register();
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
                    <div>
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
                    <Button
                        className={classe.space}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Créer un compte
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Register);
