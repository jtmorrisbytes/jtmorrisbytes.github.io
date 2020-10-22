import { Route, Switch } from "react-router-dom";
import Banner from "./components/Banner";
import Projects from "./components/Projects";
import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Routes(props) {
  return (
    <>
      <Switch>
        <Route path="/admin" exact />
        hello from splash page
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </>
  );
}
