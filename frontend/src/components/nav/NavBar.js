import React from "react";
import AuthNav from "../authentication/auth-nav";
import MainNav from "./MainNav";
import './nav.css'


const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid">
          <div className="navbar-brand logo" />
          <MainNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;