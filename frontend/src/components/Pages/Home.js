import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Chart from "./Chart";
import NumberFormat from 'react-number-format';
import { callToBackend } from "../../utils/requests";

const Home = ({ isAuthenticated }) => {
    const [name, setName] = useState("");
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [roi, setRoi] = useState(0);
    const [chartData, setChartData] = useState([]);

    const initName = async () => {
        // Fonction permettant de récuperer le nom de l'utilisateur
        const res = await callToBackend("GET", "/auth/users/me/", true);
        setName(res.first_name);
    };

    const initPortfolioValue = async () => {
        // Fonction permettant de récuperer la valeur du portfolio
        const res = await callToBackend("GET", "/api/portfolio/", true);
        const stocksValue = parseFloat(res.value);
        const currentAmount = parseFloat(res.current_amount);
        const startingAmount = parseFloat(res.starting_amount);
        setPortfolioValue(stocksValue + currentAmount);
        setRoi(((stocksValue + currentAmount) / startingAmount - 1) / 100);
    };

    const initChartData = async () => {
        // Permet de recuperer les donnees pour construire le graphique
        const res = await callToBackend("GET", "/api/portfolio/data/", true);
        // TODO: Trouver pourquoi il faut utiliser JSON.parse sur cette reponse specifiquement
        const formattedData = formatChartData(JSON.parse(res));
        setChartData(formattedData);
    };

    const formatChartData = (initialData) => {
        // Cette fonction mets les donnees du portfolio dans le format que la librairie pour les graphiques en a besoin
        /*
        Exemple de donnees:
        const data = [
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
        ]
        */
        let data = [];
        Object.keys(initialData).forEach((date) => {
            data.push({ time: date, value: initialData[date] });
        });
        return data;
    };

    useEffect(() => {
        let active = true;

        if (active) {
            initName();
            initPortfolioValue();
            initChartData();
        }
        return () => {
            active = false;
        };
    }, []);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <h1>
                Bienvenue, {name}! <br /> Valeur totale de votre portefeuille : <NumberFormat value={portfolioValue.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </h1>
            <h2>Retour sur investissement: {roi.toFixed(2)}%</h2>
            <h2>Valeur de vos actions : </h2>
            {/* Le props key est necessaire pour que le graphique soit mis a jour une fois que les donnees du graphique sont modifiees
            Pour plus d'info: https://reactjs.org/docs/lists-and-keys.html
                              https://reactjs.org/warnings/special-props.html */}
            <Chart
                key={chartData.toString()}
                data={chartData}
                chartType="line"
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
