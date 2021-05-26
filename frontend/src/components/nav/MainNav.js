import { NavLink } from "react-router-dom";
import React, {useState} from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './nav.css'

const MainNav = () => {
    const [selectedCategory, setSelectedCategory] = useState();

    return(
    <>
        <div className="navbar-nav mr-auto">
            <NavLink
                to="/"
                exact
                className="nav-link nav-text ml-auto"
                activeClassName="router-link-exact-active"
            > Home
            </NavLink>

            <NavDropdown title="Category" id="collasible-nav-dropdown">
                <NavDropdown.Item value="cat" onClick={() => setSelectedCategory("cat")} >Cat</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedCategory("dog")} >Dog</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedCategory("food")}>Food</NavDropdown.Item>
            </NavDropdown>
        </div>

        <div className="navbar-nav ml-auto">
            <NavLink
                to="/profile"
                exact
                className="nav-link nav-text "
                activeClassName="router-link-exact-active"
            >
                👤
    </NavLink>
        </div>
    </>
    )

};

export default MainNav;