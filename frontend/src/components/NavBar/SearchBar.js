import { useState, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { callToBackend } from "../../utils/requests";

// Component inspire de cette documentation: https://material-ui.com/components/autocomplete/#free-solo

const useStyles = makeStyles((theme) => ({
    padding: {
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([
        { "1. symbol": "", "2. name": "" },
    ]);
    const history = useHistory();

    const fetchData = async () => {
        if (inputValue.length > 0) {
            const body = { keywords: inputValue, }
            const res = await callToBackend("POST", "/api/search/", true, body)
            // TODO: Trouver pourquoi il faut parse cet reponse
            setResults(JSON.parse(res));
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
        history.push(`/symbol/${symbol}`);
    };

    return (
        <div style={{ width: 300 }} className={classes.padding}>
            <Autocomplete
                freeSolo
                id="search-bar"
                disableClearable
                options={results}
                getOptionLabel={(option) =>
                    option["2. name"] + " - " + option["1. symbol"]
                }
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderOption={(option) => (
                    <Fragment>
                        <span
                            onClick={() => redirectToLink(option["1. symbol"])}
                        >
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
                        variant="filled"
                        InputProps={{ ...params.InputProps, type: "search" }}
                    />
                )}
            />
        </div>
    );
}
