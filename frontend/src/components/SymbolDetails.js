import { useState, useEffect } from "react";
import Chart from "./Chart";
import Buy from "./Buy";

const SymbolDetails = ({ match }) => {
    const [chartData, setChartData] = useState([]);

    const [symbolOverview, setSymbolOverview] = useState([
        { Name: "", Symbol: "" },
    ]);

    const initSymbolInfo = async () => {
        // Permet de recuperer les donnees pour construire le graphique
        try {
            const url = "http://localhost:8000/api/symbol/";
            const body = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    symbol: match.params.symbol,
                }),
            };
            const res = await fetch(url, body);
            // On retourne la reponse sous format JSON
            const resJson = JSON.parse(await res.json());
            setChartData(resJson.chart_data);
            setSymbolOverview(resJson.info[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let active = true;
        if (active) {
            initSymbolInfo();
            console.log("Active");
        }

        return () => {
            active = false;
        }
    }, [match.params.symbol]);

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

export default SymbolDetails;
