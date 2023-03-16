import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { SlUserFollow } from "react-icons/sl";
export default function Topbar() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand href="/">
            <h1>
              <img src="./images/logo7.png" width={"16%"} /> <i>Avenue</i>
            </h1>
          </Navbar.Brand>
          <Nav className="mb-2">
            <Nav.Link href="/add">
              <h4>
                <SlUserFollow color="white"size="40px" />
              </h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
