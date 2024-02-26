import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navbars() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="logo" href="#home">
            RSS{" "}
            <img
              src="/assets/Rss flag.png"
              alt="Rss Flag"
              className="navicon"
            />
            <span>
              <h5>रास्ट्रीय स्वयंसेवक संघ</h5>
            </span>
          </Navbar.Brand>
          <Nav className=" ">
            <Nav.Link href="/register" className="feature">
              पंजीयन करें
            </Nav.Link>
            <Nav.Link href="/signin" className="feature">
              लॉगिन करें
            </Nav.Link>
            {/* <Nav.Link href="#pricing" className="feature">
              Pricing
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
