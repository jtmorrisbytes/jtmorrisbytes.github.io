import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Projects from "./components/Projects";
import Nav from "./components/Nav";
import Overview from "./components/Overview";
import UserEdit from "./components/User/Edit";
function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* side nav */}
        <Nav />
        {/* content */}

        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/projects" component={Projects} />
          <Route path="/user" component={UserEdit} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
