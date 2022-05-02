import React from "react";
import { Link } from "react-router-dom";
import './MainNavigation.css'

const mainNavigation = (props) => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Easy Event</h1>
    </div>
    <nav className="main-navigation__item">
      <ul>
        <li>
          <Link to="/auth">Authenticate</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default mainNavigation;
