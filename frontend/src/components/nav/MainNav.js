import {NavLink} from "react-router-dom";
import React from "react";
import './nav.css'

const MainNav = () => (
    <>
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link nav-text ml-auto"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
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

);

export default MainNav;