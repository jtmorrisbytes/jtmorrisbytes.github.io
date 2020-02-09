import React from 'react';
import About from './components/About'
import Nav from "./components/Nav"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Projects from "./components/Projects"
import './App.css';

function App() {
  let accessToken = document.getElementById('root').getAttribute('data-github-token') || "NO_GITHUB_TOKEN_FOUND"
  return (
    <div className="App">
    <Nav />
    <About />
    <Projects apiUrl={"https://api.github.com/graphql"} login="jtmorrisbytes" accessToken={accessToken}/>
    <Contact />
    <Footer />
    
    </div>
  );
}

export default App;
