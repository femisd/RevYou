import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {setSpecificCategory} from "./components/content/Content"
import Content from './components/content/Content';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthenticationButton from './components/authentication/authentication-button';
import Profile from "./components/profile/profile";
import NavBar from './components/nav/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

const [selectCat,SetSelectCat] = useState("");

  return (
    <Router>
      <div className="App">

        <div>
          <NavBar />
          <hr className="nav-line" />
        </div>

        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Content category={selectCat}/>
          </Route>

        </Switch>

      </div>

    </Router>

  );
}

export default App;
