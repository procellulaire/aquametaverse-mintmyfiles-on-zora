import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Chains from "../Chains/Chains";
import Web3Login from "../Web3Login/Web3Login";
import logo from "./../../assets/logo.png";

export default function TopNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          AquaMetaverse
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/minter" className="nav-link">Mint NFTs</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Chains/>
          <Web3Login />
          
        </Nav>
      </Container>
    </Navbar>
  );
}
