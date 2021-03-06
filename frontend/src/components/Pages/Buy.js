import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import { callToBackend } from "../../utils/requests";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        backgroundColor: green,
        margin: theme.spacing(1),
        marginBottom : theme.spacing(4),
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
    const [modalStyle] = useState(getModalStyle);
    const [value, setValue] = useState(0);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const minValue = 0;
    const maxValue = 99999999999999999999999999999999999999999999999999;

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const makeTrade = async () => {
        const body = {
            symbol: props.symbol,
            quantity: value,
        };
        const res = await callToBackend("POST", "/api/trade/", true, body);
        // TODO: Afficher un message d'erreur ou de succes
    };

    const body = (
        <div className={classes.paper} style={modalStyle}>
            <h3 id="aria-labelledby"> Acheter </h3>
            <p id="aria-describedby"> {props.symbol}</p>
            <br />
            <Typography>
                Quantité :
                <input
                    type="number"
                    min={minValue}
                    max={maxValue}
                    placeholder="0"
                    align="center"
                    className={classes.space}
                    onInput={(e) => setValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    className={classes.space}
                    onClick={() => {
                        makeTrade();
                        handleClose();
                    }}
                >
                    {" "}
                    Confirmer{" "}
                </Button>
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
};
export default Buy;
