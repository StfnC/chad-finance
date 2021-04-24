import { useState, useEffect, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

// Component inspire de cette documentation: https://material-ui.com/components/autocomplete/#free-solo

const useStyles = makeStyles((theme) => ({
    padding: {
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    font: {
        backgroundColor: "white",
    },
    text: {
        color: red,
    }
}));

export default function SearchBar() {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([{ "1. symbol": "", "2. name": "" }]);
    const history = useHistory();

    const fetchData = async () => {
        if (inputValue.length > 0) {
            try {
                const url = "http://localhost:8000/api/search/";
                const body = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${localStorage.getItem("access")}`,
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        keywords: inputValue,
                    }),
                };
                const res = await fetch(url, body);
                let json = await res.json();
                json = JSON.parse(json);
                setResults(json);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        let active = true;

        if (active) {
            fetchData();
        }

        return () => {
            active = false;
        };
    }, [value, inputValue]);

    const redirectToLink = (symbol) => {
        // TODO: Fix bug qui fait que si on est deja sur la page d'un stock et qu'on clic sur un lien, la page se re-render pas
        history.push(`/symbol/${symbol}`);
    }

    return (
        <div style={{ width: 300 }} className={classes.padding}>
            <Autocomplete
                freeSolo
                id="search-bar"
                disableClearable
                options={results}
                getOptionLabel={(option) => option["2. name"] + " - " + option["1. symbol"]}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    console.log(inputValue);
                }}
                renderOption={(option) => (
                    <Fragment>
                        <span onClick={() => redirectToLink(option["1. symbol"])}>
                            {option["2. name"] + " - " + option["1. symbol"]}
                        </span>
                    </Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className={classes.font}
                        label="Cherchez une action"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
}
