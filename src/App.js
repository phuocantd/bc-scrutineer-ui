import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Layout from "components/Layout";
import HomePage from "pages/home";
import LoadingPage from "pages/loading";
import LoginPage from "pages/login";
import ProfilePage from "pages/profile";

function App({ auth }) {
  return (
    <>
      <Router>
        {auth.isLoading ? (
          <LoadingPage />
        ) : !!auth.token ? (
          <Layout>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
            </Switch>
          </Layout>
        ) : (
          <LoginPage />
        )}
      </Router>
    </>
  );
}

export default connect((state) => ({ auth: state.auth }))(App);
