import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Content } from './components/content';
import { Read } from './components/read';
import { Create } from './components/create';
import { Edit } from './components/edit';
import Link from 'react-router-dom/Link';

/*<Navbar expand="xl" variant="dark" bg="dark" style={{textAlign: "center"}}>
          <Navbar.Brand href="/read">CryptoLog</Navbar.Brand>
        </Navbar>*/


class App extends Component {
  render(){
  return (
    <Router>
      <div className="App">
        <div style={{backgroundColor: "#303030", padding: "5px", fontFamily: "monospace"}}>
          <Link to='/read'><h1 style={{color: "white"}}>CryptoLog</h1></Link>
        </div>
        <Switch>
          <Route path='/' component={Content} exact/>
          <Route path='/create' component={Create}/>
          <Route path='/read' component={Read}/>
          <Route path='/edit/:id' component={Edit}/>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
