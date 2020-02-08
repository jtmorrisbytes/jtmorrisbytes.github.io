import React from 'react';
import About from './components/About'
import Nav from "./components/Nav"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Projects from "./components/Projects"
import './App.css';

function App() {
  return (
    <div className="App">
    <Nav />
    <About />
    <Projects apiUrl={"https://api.github.com/graphql"} login="jtmorrisbytes" accessToken={"b7aa04e9bdafd2c39839da5be96531708da9c3a3"}/>
    <Contact />
    <Footer />
    
    </div>
  );
}

export default App;
