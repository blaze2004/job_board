import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  function handleOpenLogin() {
    if (showSignUp == true) {
      setShowSignUp(false);
    }
    setShowLogin(true);
  }
  function handleCloseLogin() {
    setShowLogin(false);
  }
  function handleOpenSignUp() {
    if (showLogin == true) {
      setShowLogin(false);
    }
    setShowSignUp(true);
  }
  function handleCloseSignUp() {
    setShowSignUp(false);
  }

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <img src="/logo.png" />
        <Navbar.Brand href="#">SkillBridge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">Jobs</Nav.Link>
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#home">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button type="submit" onClick={handleOpenLogin}>
              Log In
            </Button>
            <Button type="submit" onClick={handleOpenSignUp}>
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        handleSwitch={handleOpenSignUp}
      />

      <SignUpModal
        show={showSignUp}
        handleClose={handleCloseSignUp}
        handleSwitch={handleOpenLogin}
      />
    </Navbar>
  );
}

export default Header;
