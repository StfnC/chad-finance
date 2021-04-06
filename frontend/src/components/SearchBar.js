import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Toolbar, fade, InputBase, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';



const usesStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    position: {
        margin: 19,
    }

}));

// TODO : Faire en sorte que lorsqu'on clique sur la loupe la fonction getStockName se fait appeler. Rajouer un event listener dessus.
const SearchBar = ({ }) => {
    // component qui affiche une barre de recherche dans la Navbar
    const classes = usesStyles();
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [test, setTest] = useState("");


    const fetchData = async () => {

        try {
            const url = "http://localhost:8000/api/search/";
            console.log(input + " bizz")
            const body = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
                data: JSON.stringify({
                    "keywords": input,
                }),
            };

            const res = await fetch(url, body);
            const json = await res.json();
            console.log(json);
            setData(json);
        } catch (e) {
            console.log(e);
        }

    }




    useEffect(() => {
        getInput();
    }, [input]);

    function getInput() {
        console.log(input + " before enter");
        /* if (document.getElementById("searchBar") != null) {
            document.getElementById("searchBar").addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                  
                  fetchData();
                }
            })
        } */
        if (input.length > 0) {
            console.log(input);
            fetchData();
        }
    }
    const handleChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);

    };


    return (
        <div>
            <Toolbar className={classes.position}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>

                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        id="searchBar"
                        onInput={(e) => setInput(e.target.value)}
                        onChange={handleChange}
                        value={input}
                        inputProps={{ 'aria-label': 'Rechercher' }}
                    />

                </div>

            </Toolbar>
            {input}

        </div>
    );
}

export default SearchBar;

/* function getStockName() {

       // fonction pour donner au backend ce que l'utilisateur a demandé dans la search bar. Input = Stock abb ou name
       const body = {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               Authorization: `JWT ${localStorage.getItem("access")}`,
               Accept: "application/json",
           },
           data: JSON.stringify({
               "keywords": "TSLA",
           }),
       };

       fetch("http://localhost:8000/api/search/", body).then((response) => {
           if (!response.ok) {
               console.log(response.json());
               return {};

           } else {
               console.log(response.json());
               return response.json();
           }
       })
           .then((data) => {
               setData(response.json())
               setResult(response.json().slice())
           })

   }*/