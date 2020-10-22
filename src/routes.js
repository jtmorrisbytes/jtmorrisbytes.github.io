import { Route, Switch } from "react-router-dom";
import Banner from "./components/Banner";
import Projects from "./components/Projects";
import React from "react";

export default function Routes(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Banner} />
        <Route path="/about" component={Banner} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </>
  );
}
