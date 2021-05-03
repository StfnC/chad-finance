import "../App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, loadUser } from "../actions/auth";
import Navbar from "./NavBar/Navbar";
import Footer from "./Pages/Footer";

const Layout = ({ checkAuthenticated, loadUser, children }) => {
    useEffect(() => {
        let active = true;

        if (active) {
            checkAuthenticated();
            loadUser();
        }

        return () => {
            active = false; 
        };
    });

    return (
        <div>
            <Navbar />
            <div className="center">{children}</div>
            <Footer />
        </div>
    );
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
