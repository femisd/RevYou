import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content/Content';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthenticationButton from './components/authentication/authentication-button';
import Profile from "./components/profile/profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">WEB-APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="#">Nav Link</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="/profile"><img className="nav-profile-pic" src="https://www.greekpaints.com/wp-content/uploads/2017/12/profile-photo-placeholder.png" alt="prof"/></Nav.Link>
                <AuthenticationButton />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Content />
        </Route>

      </Switch>
      
      </div>

    </Router>

  );
}

export default App;
