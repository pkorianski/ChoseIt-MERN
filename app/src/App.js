import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import "./components/layout/Navbar";
import "./components/layout/Landing";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Landing></Landing>
          <footer></footer>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
