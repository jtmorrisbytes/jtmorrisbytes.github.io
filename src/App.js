import React, { useEffect, useState } from "react";
import About from "./components/Banner";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

// import Routes from "./routes";

import { HashRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Banner from "./components/Banner";

import apiClient from "./lib/apiClient";
import AdminApp from "./components/Admin/";
import Login from "./components/Admin/Login";

function App() {
  // grab user info on launch
  const [user, setUserView] = useState(null);
  useEffect(() => {
    // get the aggregated user data from the api server
    apiClient
      .get("/user")
      .then(() => {})
      .catch((e) => {
        console.error("getUser failed in App", e);
      });
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          {/* display admin panel */}
          <Route path="/admin" component={AdminApp} />
          <Route path="/login" component={Login} />
          <Route>
            <Nav />
            <Banner />
            <Projects />
            <Contact />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
