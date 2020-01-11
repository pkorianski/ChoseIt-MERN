import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

const NavbarC = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">chose~it</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "2rem"
                }}
                href="/why_choseit/"
              >
                The Why?
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/membership_benefits/">
                Membership Benefits
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem
              style={{
                width: "10rem"
              }}
            >
              <NavLink className="btn btn-light" href="/login/">
                Log In
              </NavLink>
            </NavItem>
            <NavItem
              style={{
                width: "10rem"
              }}
            >
              <NavLink
                className="btn btn-secondary"
                style={{ color: "white" }}
                href="/signup/"
              >
                Sign Up
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

Navbar.propTypes = {};

export default NavbarC;
