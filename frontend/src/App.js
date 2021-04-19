import React from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Activate from "./components/Activate";
import SymbolDetails from "./components/SymbolDetails";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
    return (
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
                            component={withRouter(SymbolDetails)}
                        />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
}
