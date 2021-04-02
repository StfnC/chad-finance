import React, { useState, useEffect } from 'react';
import { logout } from "../actions/auth";
import { makeStyles, Button, MenuItem, Menu } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import { connect } from "react-redux";



const usesStyles = makeStyles((theme) => ({
     MenuItem : {
         position : 'static',
     }
}));

const About = ({ logout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = usesStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    

    return (
        <div>
            <Button className = {classes.MenuItem}
                variant="contained" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>About</Button>
            <Menu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>About us</MenuItem>
                <MenuItem to="/login" onClick={logout} > Logout </MenuItem>
               {/* <Button to="/login" onCLick={logout, handleClose} >Logout here</Button> */}
            </Menu>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(About);