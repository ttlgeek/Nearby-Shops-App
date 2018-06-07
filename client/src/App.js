import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";

const App = ({ location, isAuthenticated }) => (
  <div className="container">
    <Route path="/" exact component={HomePage} />
    <Route
      path="/signup"
      location={location}
      exact
      render={() =>
        !isAuthenticated ? <SignupPage /> : <Redirect to="/dashboard" />
      }
    />
    <Route
      path="/login"
      location={location}
      exact
      render={() =>
        !isAuthenticated ? <LoginPage /> : <Redirect to="/dashboard" />
      }
    />
    <Route
      path="/dashboard"
      location={location}
      exact
      render={() => (isAuthenticated ? <DashboardPage /> : <Redirect to="/" />)}
    />
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!localStorage.token
  };
}

export default connect(mapStateToProps)(App);
