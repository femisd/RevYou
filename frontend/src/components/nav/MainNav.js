import { NavLink } from "react-router-dom";
import React, {useState} from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './nav.css'
import {CategoryStore} from "../../CategoryStore" 

const MainNav = () => {

    return(
    <>
        <div className="navbar-nav mr-auto">
            <NavLink
                to="/"
                exact
                className="nav-link nav-text ml-auto"
                activeClassName="router-link-exact-active"
                onClick={() => CategoryStore.update(s => {s.category = ""})}
            > Home
            </NavLink>

            <NavDropdown title="Category" id="collasible-nav-dropdown">
                <NavDropdown.Item value="cat" onClick={() => CategoryStore.update(s => {s.category = "Cat"})} >Cat</NavDropdown.Item>
                <NavDropdown.Item onClick={() => CategoryStore.update(s => {s.category = "Dog"})} >Dog</NavDropdown.Item>
                <NavDropdown.Item onClick={() => CategoryStore.update(s => {s.category = "Food"})}>Food</NavDropdown.Item>
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