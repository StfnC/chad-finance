import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>({

    root:{
        background: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
        bottom : "0",
        left : "0",
        width: "100%",
        height: "65px",
        position : "fixed",
        margintop: theme.spacing(5),
    }
}));


const Footer = () => {
    const classes = useStyles();
    return(
        <div className = {classes.root}> 
           
                <p> Copyright &copy; 2021; Chad Finance</p>
           
        </div>
    );
}
export default Footer;