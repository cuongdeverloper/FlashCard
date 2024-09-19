import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavHeader.scss";
import { IoPersonCircle } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import logoImg from "../../assests/logo.png";
import { IoAddOutline } from "react-icons/io5";
import { NavDropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const NavHeader = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const cart1 = useSelector((state) => state.cart); // Adjust according to your state structure
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to handle mouse entering a dropdown
  const handleMouseEnter = (dropdownId) => {
    setOpenDropdown(dropdownId);
  };

  // Function to handle mouse leaving a dropdown
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="Header-container" style={{ zIndex: "1000", width: "100%" }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="container-navbar">
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ height: "100%", width: "auto" }}
          >
            <img
              style={{ height: "100%", width: "auto" }}
              src={logoImg}
              alt="FlashCardLogo Logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="mid-navbar-nav">
                  <FaSearch id="search-icon" />
                  <input placeholder="Searching to faster..."></input>
            </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto"> */}
            <div className="d-flex flex-wrap navbar-outlay">
              {/* Icon Dropdown */}
              <div
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter("shirt-dropdown")}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "pointer" }}
              >
                <NavDropdown
                  title={
                    <span>
                      <IoAddOutline
                        style={{
                          color:
                            openDropdown === "shirt-dropdown"
                              ? "yellow"
                              : "white",
                          fontSize: "24px",
                        }}
                      />
                    </span>
                  }
                  id="shirt-dropdown"
                  show={openDropdown === "shirt-dropdown"}
                >
                  <NavDropdown.Item as={NavLink} to="/shop/product/shirt">
                    Class
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/crud-q">
                    FlashCard/Quiz
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/shop/product/ao-ba-lo">
                    Folder
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>

            {/* </Nav> */}
          </Navbar.Collapse>

          <Navbar.Collapse>
            <Nav>
              {isAuthenticated ? (
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
              <Nav.Link onClick={() => navigate("/user")}>
                <IoPersonCircle />
              </Nav.Link>

              <Nav.Link href="#home">
                <GoSearch />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavHeader;
