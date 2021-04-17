import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
//import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: green,
    },
    space: {
        margin: theme.spacing(1),
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };

}
const Buy = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [symbols, setSymbols] = useState("");
    const [modalStyle] = useState(getModalStyle);
    const [value, setValue] = useState(0);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const minValue = 0;
    const maxValue = 99999999999999999999999999999999999999999999999999;

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const fetchAmount = async () => {
        try{
            const url = `http://localhost:8000/api/symbol/${props.symbol}/buy`;
            const body = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    keywords: value,
                }),
            };
            const res = await fetch(url, body);
            if(res.ok){
                setSuccessMsg("La transaction s'est fait avec succes");
            }else{
                setErrorMsg("Un probleme sest produit, la transaction ne s'est pas effectué");
            }
            
        }catch(e){
            console.log(e);

        }

    }

    const body = (
        <div className={classes.paper} style={modalStyle}>
            <h3 id="aria-labelledby"> Acheter </h3>
            <p id="aria-describedby"> {props.symbol}</p>
            <br />
            <Typography>
                 Quantité : 
                 <input type="number" min={minValue} max={maxValue} placeholder='0' aria-label align="center" className = {classes.space}/> 
                 <Button 
                 variant="contained"
                 className = {classes.space}
                 > Confirmé </Button>
                 </Typography>
        </div>
    );

    return (
        <div>
            <Button
                className={classes.button}
                variant="contained"
                onClick={handleOpen}
            >
                Achat
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
            >

                {body}
            </Modal>
        </div>
    );
}
export default Buy;