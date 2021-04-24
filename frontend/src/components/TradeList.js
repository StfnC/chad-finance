import { useState, useEffect } from "react";
import { connect } from "react-redux";
import TradeTable from "./TradeTable";

const TradeList = ({ isAuthenticated }) => {
    const [trades, setTrades] = useState([])

    const initTrades = async () => {
        try {
            const url = "http://localhost:8000/api/trade/all";
            const body = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await fetch(url, body);
            const resJson = await res.json();
            setTrades(resJson);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let active = true;

        if (active) {
            initTrades();
        }

        return () => {
            active = false;
        }
    }, []);

    // TODO: Add redirect for non authenticated users

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
