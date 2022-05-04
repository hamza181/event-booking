import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import AuthContext from "../../context/auth-context";

const mainNavigation = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to="/">Event Booking</Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              {!context.token && <Link to="/auth">Authentication</Link>}
              <Link to="/events">Events</Link>
              {context.token && <Link to="/bookings">Bookings</Link>}
              {context.token && <Link to="/auth" onClick={context.logout}>Logout</Link>}
            </Nav>
          </Container>
        </Navbar>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
