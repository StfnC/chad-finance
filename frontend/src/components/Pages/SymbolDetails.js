import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Chart from "./Chart";
import Buy from "./Buy";
import { callToBackend } from "../../utils/requests";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        marginTop: theme.spacing(5),
    },
    paper: {
        padding: theme.spacing(2),
        width: 800,
        color: theme.palette.text.secondary,
    },
    hr: {
        width: 800,
        marginLeft: 1,
    },
    description: {
        width: 800,
        marginLeft: 1,
        textAlign: "justify",
        fontFamily:[ "Times New Roman", "Times", "serif"],

    }
}));

const SymbolDetails = ({ match, isAuthenticated }) => {
    const [chartData, setChartData] = useState([]);
    const classes = useStyles();
    const [symbolOverview, setSymbolOverview] = useState([
        { Name: "", Symbol: "" },
    ]);

    const initSymbolInfo = async () => {
        // Permet de recuperer les donnees pour construire le graphique
        const body = { symbol: match.params.symbol };
        const res = JSON.parse(
            await callToBackend("POST", "/api/symbol/", true, body)
        );
        // Si la reponse contient un message, cela veut dire qu'il y a eu une erreur lors de la requete
        if (!res.chart_data.message) {
            setChartData(res.chart_data);
        }
        if (!res.info.message) {
            setSymbolOverview(res.info[0]);
        }
    };

    useEffect(() => {
        let active = true;

        if (active) {
            initSymbolInfo();
        }

        return () => {
            active = false;
        };
    }, [match.params.symbol]);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }
    const infoPrice = () => {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Typography>
                                {" "}
                                52 week High : {symbolOverview["52WeekHigh"]} $
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                {" "}
                                52 week Low : {symbolOverview["52WeekLow"]} $
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                Moyenne mobile sur 50 jours :{" "}
                                {symbolOverview["50DayMovingAverage"]} $
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                Moyenne mobile sur 200 jours :{" "}
                                {symbolOverview["200DayMovingAverage"]} $
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                Devise utilisé : {symbolOverview["Currency"]}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                Capitalisation de l'entreprise :{" "}
                                {symbolOverview["MarketCapitalization"]} $
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };

    const infoStock = () => {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Typography>
                                Secteur : {symbolOverview["Sector"]}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                Échange : {symbolOverview["Exchange"]}{" "}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                {" "}
                                Price-earnings to Growth (PEG) :{" "}
                                {symbolOverview["PEGRatio"]}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography>
                                {" "}
                                Ratio Price to Earnings (PE) :{" "}
                                {symbolOverview["PERatio"]}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography></Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Typography></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };

    const definitionStock = () => {
        return (
            <div className={classes.root}>
                <Typography className={classes.description}>
                    {" "}
                    {symbolOverview["Description"]}
                </Typography>
            </div>
        );
    };

    return (
        <div>
            <h1>
                {symbolOverview["Name"]} ({symbolOverview["Symbol"]})
            </h1>
            <Chart
                key={chartData.toString()}
                data={chartData}
                chartType="candle"
            />
            {/* Company Overview */}
            <Buy symbol={symbolOverview["Symbol"]} />
            <hr className={classes.hr} />
            <br />
            <h3>Information sur le prix</h3>
            {infoPrice()}
            <hr className={classes.hr} />
            <h3>Information sur la compagnie</h3>
            {infoStock()}
            <hr className={classes.hr} />
            <h3>Description de la compagnie</h3>
            {definitionStock()}
            <hr className={classes.hr} />
            <br />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(SymbolDetails);
