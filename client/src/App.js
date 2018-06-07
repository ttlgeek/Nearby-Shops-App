import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import SignupPage from "./components/pages/SignupPage";
import LoginPage from "./components/pages/LoginPage";
import NavBar from "./components/navbar/NavBar";
import NearbyShops from "./components/pages/NearbyShops";
import PreferredShops from "./components/pages/PreferredShops";

const App = ({ location, isAuthenticated }) => (
  <div className="container">
    <NavBar />
    <Route
      path="/"
      exact
      render={() =>
        !isAuthenticated ? <HomePage /> : <Redirect to="/nearby" />
      }
    />
    <Route
      path="/signup"
      location={location}
      exact
      render={() =>
        !isAuthenticated ? <SignupPage /> : <Redirect to="/nearby" />
      }
    />
    <Route
      path="/login"
      location={location}
      exact
      render={() =>
        !isAuthenticated ? <LoginPage /> : <Redirect to="/nearby" />
      }
    />
    <Route
      path="/nearby"
      location={location}
      exact
      render={() => (isAuthenticated ? <NearbyShops /> : <Redirect to="/" />)}
    />
    <Route
      path="/preferred"
      location={location}
      exact
      render={() =>
        isAuthenticated ? <PreferredShops /> : <Redirect to="/" />
      }
    />
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!localStorage.token
  };
}

export default connect(mapStateToProps)(App);
