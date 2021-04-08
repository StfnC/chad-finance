import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Chart from "./Chart";

const Home = ({ isAuthenticated }) => {
    const [name, setName] = useState("");
    const [value, setValue] = useState();
    // TODO: Recuperer les donnees du portfolio dans ce format
    const [chartData, setChartData] = useState([
        { time: "2019-04-11", value: 80.01 },
        { time: "2019-04-12", value: 96.63 },
        { time: "2019-04-13", value: 76.64 },
        { time: "2019-04-14", value: 81.89 },
        { time: "2019-04-15", value: 74.43 },
        { time: "2019-04-16", value: 80.01 },
        { time: "2019-04-17", value: 96.63 },
        { time: "2019-04-18", value: 76.64 },
        { time: "2019-04-19", value: 81.89 },
        { time: "2019-04-20", value: 74.43 },
    ]);

    // Fonction permettant de récuperer le nom de l'utilisateur
    const initName = async () => {
        try {
            const url = "http://localhost:8000/auth/users/me/";
            const body = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await fetch(url, body);
            const res_json = await res.json();
            setName(res_json.first_name);
        } catch (error) {
            console.log(error);
        }
    };

    const initValue = async () => {

        try {
            const url = "http://localhost:8000/api/portfolio";
            const body = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await fetch(url, body);
            const res_json = await res.json();
            setValue(res_json.value)
            console.log(value);


        } catch (error) {
            console.log(error);
        }
    };

    const initChartData = async () => {
        // Permet de recuperer les donnees pour construire le graphique
        try {
            const url = "http://localhost:8000/api/portfolio/data/";
            const body = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await fetch(url, body);
            // On retourne la reponse sous format JSON
            const res_json = JSON.parse(await res.json());
            const formattedData = formatChartData(res_json);
            console.log(formattedData);
            setChartData(formattedData);
        } catch (error) {
            console.log(error);
        }
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
        initName();
        // TODO: Figure out why the chart doesn't update
        initChartData();
        initValue();
    }, []);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <h1>Bon matin, {name} votre valeur est de {value} </h1>
            <Chart key={chartData.toString()} data={chartData}></Chart>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
