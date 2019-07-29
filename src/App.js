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
    <Projects apiUrl={"https://api.github.com/graphql"} login="jtmorrisbytes" accessToken={"bfc90dc0860aca9063a8670dfb4bbcb68bb73dfd"}/>
    <Contact />
    <Footer />
    
    </div>
  );
}

export default App;
