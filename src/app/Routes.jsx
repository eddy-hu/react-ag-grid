import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";

const LayoutRouter = (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect exact from="/home" to="/" />
        <Route component={Error} />
      </Switch>
    </Layout>
  );

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Home} />
          <Route render={props => LayoutRouter} />
        </Switch>
      </Router>
    );
  }
}
