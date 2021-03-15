import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

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

    return (
        <div>
            <h1>Hello, {name}</h1>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
