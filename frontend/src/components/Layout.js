import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, loadUser } from "../actions/auth";
import Navbar from "./NavBar/Navbar";

const Layout = ({ checkAuthenticated, loadUser, children }) => {
    useEffect(() => {
        checkAuthenticated();
        loadUser();
    });

    return (
        <div>
            <Navbar />
            <div className="center">{children}</div>
        </div>
    );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
