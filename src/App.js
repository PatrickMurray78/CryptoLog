import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Content} from 'components/content.js';
class App extends Component {
  render(){
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">CryptoLog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/read">Read</Nav.Link>
          <Nav.Link href="/create">Create</Nav.Link>
        </Nav>
        </Navbar>
        <Switch>
          <Route path='/' component={Content} exact/>
          <Route path='/create' component={Create} exact/>
          <Route path='/read' component={Read} exact/>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
