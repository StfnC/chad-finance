import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, loadUser } from "../actions/auth";
import Navbar from "./Navbar";

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="center">{props.children}</div>
        </div>
    );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
