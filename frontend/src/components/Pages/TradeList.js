import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TradeTable from "./TradeTable";
import { callToBackend } from "../../utils/requests";

const TradeList = ({ isAuthenticated }) => {
    const [trades, setTrades] = useState([]);

    const initTrades = async () => {
        // On obtient la liste de tous les trades effectues
        const res = await callToBackend("GET", "/api/trade/all/", true)
        setTrades(res);
    };

    useEffect(() => {
        let active = true;

        if (active) {
            initTrades();
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
            <h1>Transactions</h1>
            <TradeTable rows={trades} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(TradeList);
