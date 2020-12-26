import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Read } from './components/portfolio';
import { Create } from './components/create';
import { Edit } from './components/edit';
import Link from 'react-router-dom/Link';

class App extends Component {
  render(){
  return (
    <Router>
      <div className="App">
        <div style={{backgroundColor: "#303030", padding: "5px", fontFamily: "monospace"}}>
          <Link to='/'><h1 style={{color: "white"}}>CryptoLog</h1></Link>
        </div>
        <Switch>
          <Route path='/' component={Read} exact/>
          <Route path='/create' component={Create}/>
          <Route path='/edit/:id' component={Edit}/>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
