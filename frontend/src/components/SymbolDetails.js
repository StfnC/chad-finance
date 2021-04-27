import { useState, useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
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
            const res_json = JSON.parse(await res.json());
            setChartData(res_json.chart_data);
            setSymbolOverview(res_json.info[0]);
        } catch (error) {
            console.log(error);
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
    }, []);

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
