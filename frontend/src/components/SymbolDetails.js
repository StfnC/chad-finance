import { useState, useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import Chart from "./Chart";

const minValue = 1;
const maxValue = 99999999999999999999999999999999999999999999999999;

const SymbolDetails = ({ match }) => {
    const [chartData, setChartData] = useState([
        {
            time: "2018-12-19",
            open: 141.77,
            high: 170.39,
            low: 120.25,
            close: 145.72,
        },
        {
            time: "2018-12-20",
            open: 145.72,
            high: 147.99,
            low: 100.11,
            close: 108.19,
        },
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initSymbolInfo();
    }, []);

    return (
        <div>
            <h1>IBM</h1>
            <p>Description</p>
            <Chart
                key={chartData.toString()}
                data={chartData}
                chartType="candle"
            />
            <input type="number" min={minValue} max={maxValue}></input>
            <button>Buy</button>
            <button>Sell</button>
            {/* Company Overview */}
        </div>
    );
};

export default SymbolDetails;
