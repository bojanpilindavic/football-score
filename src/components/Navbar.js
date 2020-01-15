import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const FootballNavbar = props => {
  let content = (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Football Score</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Create league
        </Nav.Link>
      </Nav>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/Table">
          Table
        </Nav.Link>
      </Nav>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/MatchResults">
          Results
        </Nav.Link>
      </Nav>
    </Navbar>
  );
  return content;
};

export default FootballNavbar;
