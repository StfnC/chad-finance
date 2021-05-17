import { useHistory } from "react-router";
import { makeStyles, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import About from "./About";
import { Fragment } from "react";
import logo from "./logo.png";

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
    button: {
        marginRight: 6,
    }
}));

const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();
    const history = useHistory();

    const redirectTo = (link) => {
        // Redirige l'utilisateur vers une certaine page
        history.push(link);
    };

    const anonymLinks = () => {
        return (
            <Button
                color="secondary"
                variant="contained"
                onClick={(e) => redirectTo("/login")}
            >
                Connexion
            </Button>
        );
    };

    const userLinks = () => {
        return (
            <Fragment>
                <SearchBar />
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={(e) => redirectTo("/trades")}
                    className = {classes.button}
                >
                    Transactions
                </Button>
                <About />
            </Fragment>
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
                        component={Link}
                        to="/"
                    >
                        <img src={logo} alt="logo" style={{ width: 180 }} />
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
