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
    <Projects />
    <About />
    <Contact />
    <Footer />
    
    </div>
  );
}

export default App;
