import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ data }) => {
    const chartRef = useRef(null);

    // Quand la page se charge, on initialise le graphique
    useEffect(() => {
        const chart = createChart(chartRef.current, {
            width: 800,
            height: 600,
        });
        const lineSeries = chart.addLineSeries();
        lineSeries.setData(data);

        return () => {
            // On enleve le graphique une fois que l'utilisateur quitte la page ou la rafraichie
            chart.remove();
        };
    }, []);

    return <div ref={chartRef} />;
};

export default Chart;
