import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content/Content';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthenticationButton from './components/authentication/authentication-button';

function App() {
  return (
    <div className="App">

      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#home">WEB-APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Nav Link</Nav.Link>
              <Nav.Link href="#">Nav Link</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
            <AuthenticationButton />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>



      <Content />
    </div>
  );
}

export default App;
