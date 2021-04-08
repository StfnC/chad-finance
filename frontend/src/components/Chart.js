import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ key, data, chartType }) => {
    const chartRef = useRef(null);

    // Quand la page se charge, on initialise le graphique
    useEffect(() => {
        const chart = createChart(chartRef.current, {
            width: 800,
            height: 600,
        });

        switch (chartType) {
            default:
                break;
            case "line":
                const lineSeries = chart.addLineSeries();
                lineSeries.setData(data);
                break;
            case "candle":
                const candleStickSeries = chart.addCandlestickSeries();
                candleStickSeries.setData(data);
                break;
        }

        return () => {
            // On enleve le graphique une fois que l'utilisateur quitte la page ou la rafraichie
            chart.remove();
        };
    }, []);

    // Le props key est necessaire pour que le graphique soit mis a jour une fois que les donnees du graphique sont modifiees
    // Pour plus d'info: https://reactjs.org/docs/lists-and-keys.html
    return <div key={key} ref={chartRef} />;
};

export default Chart;
