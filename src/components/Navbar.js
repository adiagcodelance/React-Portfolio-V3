// Navbar.js

import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkMouseEnter = (index) => {
    setActiveLink(index);
  };

  const handleLinkMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-transparent" id="navbar">
      <a className="navbar-brand ps-5" id="navbarlogo" href="/">
        <label className="brand">AA</label>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar" id="navbarNav">
        <ul className="navbar-nav m-auto pe-5" id="navbarList">
          <li
            className={`nav-item ${activeLink === 0 ? "active" : ""}`}
            id="navitem"
          >
            <a
              className="nav-link"
              href="/"
              onMouseEnter={() => handleLinkMouseEnter(0)}
              onMouseLeave={handleLinkMouseLeave}
            >
              About Me
            </a>
            <div
              className={`underline ${activeLink === 0 ? "show" : ""}`}
            ></div>
          </li>
          <li className="nav-item" id="navitem">
            <a className="nav-link" href="/projects">
              Projects
            </a>
            <div className="underline"></div>
          </li>
          <li className="nav-item" id="navitem">
            <a className="nav-link" href="/socials">
              Socials
            </a>
            <div className="underline"></div>
          </li>
          {/** 
          <li className="nav-item" id="navitem">
            <a className="nav-link" href="/reviews">
              Reviews
            </a>
            <div className="underline"></div>
          </li>
*/}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
