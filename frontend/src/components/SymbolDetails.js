import { useState, useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import Chart from "./Chart";

const minValue = 1;
const maxValue = 99999999999999999999999999999999999999999999999999;

const SymbolDetails = ({ match }) => {

    const [chartData, setChartData] = useState([]);
    
    const [SymbolOverview, setSymbolOverview] = useState({}); 
    
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
            setSymbolOverview(res_json.info);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initSymbolInfo();
    }, []);

    return (
        <div>
            <h1>{SymbolOverview[0]["Name"]} ({SymbolOverview[0]["Symbol"]})</h1>
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
