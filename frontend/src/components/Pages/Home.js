import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Chart from "./Chart";
import { callToBackend } from "../../utils/requests";

const Home = ({ isAuthenticated }) => {
    const [name, setName] = useState("");
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [chartData, setChartData] = useState([]);

    const initName = async () => {
        // Fonction permettant de récuperer le nom de l'utilisateur
        const res = await callToBackend("GET", "/auth/users/me/", true);
        setName(res.first_name);
    };

    const initPortfolioValue = async () => {
        // Fonction permettant de récuperer la valeur du portfolio
        const res = await callToBackend("GET", "/api/portfolio/", true);
        setPortfolioValue(parseFloat(res.value));
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
            initChartData();
            initPortfolioValue();
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
                Voici votre portfolio, {name} <br /> Valeur : {portfolioValue.toFixed(2)}
            </h1>
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
