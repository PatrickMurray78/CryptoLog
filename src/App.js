import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';

class App extends Component {
  render(){
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">CryptoLog</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      </Navbar>
    </div>
  );
  }
}

export default App;
