import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing(2),
        flex: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();

    // TODO: Transformer Logout et Login en boutons pour les rendre plus beaux

    const anonymLinks = () => {
        return (
            <Link color="inherit" to="/login">
                Login
            </Link>
        );
    };

    const userLinks = () => {
        return (
            <Link color="inherit" to="/login" onClick={logout}>
                Logout
            </Link>
        );
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.logo}
                        color="inherit"
                        aria-label="home"
                    >
                        Chad Finance
                    </IconButton>
                    {/* Remplace des if else (opérateur ternaire) */}
                    {isAuthenticated ? userLinks() : anonymLinks()}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);