import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
}
