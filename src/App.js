import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
