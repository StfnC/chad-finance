import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Activate from "./components/Auth/Activate";
import SymbolDetails from "./components/Pages/SymbolDetails";
import TradeList from "./components/Pages/TradeList";
import { Provider } from "react-redux";
import store from "./utils/store";
import "./App.css";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./utils/theme";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router>
                    <Layout>
                        <div className="page-container">
                            <div className="content-wrap">
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/activate/:uid/:token"
                                        component={Activate}
                                    />
                                    <Route
                                        exact
                                        path="/symbol/:symbol"
                                        component={SymbolDetails}
                                    />
                                    <Route
                                        exact
                                        path="/trades"
                                        component={TradeList}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </Layout>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}
