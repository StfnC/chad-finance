import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Chart from "./Chart";

const Home = ({ isAuthenticated }) => {
    const [name, setName] = useState("");

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

    useEffect(() => {
        initName();
    }, []);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    // TODO: Recuperer les donnees du portfolio dans ce format
    const chartData = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ]

    return (
        <div>
            <h1>Hello, {name}</h1>
            <Chart data={chartData}></Chart>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
