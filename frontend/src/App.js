import React from "react";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/LoginScreen/Login";
import Register from "./components/LoginScreen/Register";
import Activate from "./components/LoginScreen/Activate";
import SymbolDetails from "./components/SymbolDetails";
import TradeList from "./components/TradeList";
import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
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
                            <Route exact path="/trades" component={TradeList} />
                        </Switch>
                    </Layout>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}
