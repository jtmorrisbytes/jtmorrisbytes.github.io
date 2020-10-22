import React from "react";
import About from "./components/Banner";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

import Routes from "./routes";

import { HashRouter } from "react-router-dom";

import "./App.css";
import Banner from "./components/Banner";

function App() {
  let accessToken =
    document.getElementById("root").getAttribute("data-github-token") ||
    "NO_GITHUB_TOKEN_FOUND";
  return (
    <div className="App">
      <Nav />
      <Banner />
      <HashRouter>
        <Routes />
      </HashRouter>
    </div>
  );
}

export default App;
