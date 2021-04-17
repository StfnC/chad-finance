import React, { useState, useEffect } from "react";
import { logout } from "../actions/auth";
import { makeStyles, Button, MenuItem, Menu } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };

}

const usesStyles = makeStyles((theme) => ({
    MenuItem: {
        position: "static",
    },
    paper: {
        position: 'absolute',
        height: 600,
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const About = ({ logout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalStyle] = useState(getModalStyle);
    const [openProfile, setOpenProfile] = useState(false);
    const [openAboutUs, setOpenAboutUs] = useState(false);

    const classes = usesStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenProfile = () => {
        setOpenProfile(true);
    }
    const handleCloseProfile = () => {
        setOpenProfile(false);
    }
    const handleOpenAboutUs = () => {
        setOpenAboutUs(true);
    }
    const handleCloseAboutUs = () => {
        setOpenAboutUs(false);
    }

    function Profile() {
        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openProfile}
                    onClose={handleCloseProfile}
                >
                    <div className={classes.paper} style={modalStyle}>
                        <h2>Hello profile</h2>
                        <br />
                        <p>Vous avez x dans votre compte</p>
                        <br />
                        <p> Vous avez telle action : </p>
                    </div>
                </Modal>
            </div>
        );
    }

    function AboutUs() {
        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openAboutUs}
                    onClose={handleCloseAboutUs}
                >
                    <div className={classes.paper} style={modalStyle}>
                        <h2>Nous sommes Chad Finance!</h2>
                        <br />
                        <p>L'équipe est constitué de 4 personnes motivés à réussir dans la vie. Ceci est notre projet intégrateur dans le cadre du cours de programmation.  </p>


                    </div>
                </Modal>
            </div>
        );
    }


    return (
        <div>
            <Button
                className={classes.MenuItem}
                variant="contained"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                About
            </Button>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    handleOpenProfile();
                }}>
                    Profile</MenuItem>

                <MenuItem onClick={() => {
                    handleClose();
                    handleOpenAboutUs();
                }}>About us</MenuItem>
                {AboutUs()}
                {Profile()}
                <MenuItem to="/login" onClick={logout}>
                    {" "}
                    Logout{" "}
                </MenuItem>
                {/* <Button to="/login" onCLick={logout, handleClose} >Logout here</Button> */}
            </Menu>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(About);
