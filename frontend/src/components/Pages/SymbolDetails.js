import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Chart from "./Chart";
import Buy from "./Buy";
import { callToBackend } from "../../utils/requests";

const SymbolDetails = ({ match, isAuthenticated }) => {
    const [chartData, setChartData] = useState([]);

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
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(SymbolDetails);
