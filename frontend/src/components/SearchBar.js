import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Toolbar, fade } from '@material-ui/core';

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

}));

function getStockName(){
    fetch("/api/stock-tags").then((response) => {
        if(!response.ok){
            return{};
        }else {
            return response.json();
        }
    })
    .then((data) => {
    })
}

function getInput() {
    let input = "";
    if (document.getElementById("searchBar") != null) {
        document.getElementById("searchBar").addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                input = document.getElementById("searchBar").value;
                //fetchData();
                console.log(input);
            }
        });
    }
}



const SearchBar = ({ }) => {
    const classes = usesStyles();
    const [input, setInput] = useState("");

    function getStockName(input){
        const body = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
            data : {
                "keywords": input
            }
        };
        fetch("http://localhost:8000/api/search/", body).then((response) => {
            if(!response.ok){
                return {};
            }else {
                return response.json();
            }
        })
        .then((data) => {
           // return data.json();
        })
    }
    
    function getInput() {
        
        if (document.getElementById("searchBar") != null) {
            document.getElementById("searchBar").addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    setInput(document.getElementById("searchBar").value);
                    //getStockName(input);
                    console.log(input);
                }
            });
        }
        return input;
    }
    

    useEffect(() => {
        getInput();
        return () => {
            
        }
    }, [input])

    return (
        <div>
            <Toolbar>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon   />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        id="searchBar"
                        onRequestSearch = {getInput()}
                        inputProps={{ 'aria-label': 'Rechercher' }}
                    />
                </div>

            </Toolbar>

            <h1 color="black"> {input} </h1>
        </div>
    );
}

export default SearchBar;