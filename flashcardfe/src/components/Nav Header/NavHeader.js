import React, { useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavHeader.scss";
import { IoPersonCircle } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import logoImg from "../../assests/logo.png";
import { IoAddOutline } from "react-icons/io5";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { searchItems } from "../../service/ApiService";

const NavHeader = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (dropdownId) => {
    setOpenDropdown(dropdownId);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const response = await searchItems(query);
      setSearchResults(response.data || []);
    } else {
      setSearchResults([]); 
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await searchItems(searchQuery);
    setSearchResults(response.data || []);
    const results = response.data
    navigate("/search", { state: {results, query: searchQuery } });
    setSearchQuery(""); 
    setSearchResults([]); 
  };

  const handleResultClick = (result) => {
    navigate(`/detailquespack/${result._id}`);
    setSearchQuery(""); 
    setSearchResults([]); 
  };

  return (
    <div className="Header-container" style={{ zIndex: "1000", width: "100%" }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="container-navbar">
          <Navbar.Brand onClick={() => navigate("/")} style={{ height: "100%", width: "auto" }}>
            <img style={{ height: "100%", width: "auto" }} src={logoImg} alt="FlashCardLogo Logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="mid-navbar-nav">
            <form onSubmit={handleSearchSubmit} className="d-flex" style={{ margin: "0", width: "100% ", position: "relative" }}>
              <FaSearch id="search-icon" />
              <input
                placeholder="Searching to faster..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" style={{ display: "none" }}>Search</button>

              {/* Render search results */}
              {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <ul>
                    {searchResults.map((result, index) => (
                      <li key={index} onClick={() => handleResultClick(result)}>
                        {result.title} 
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex flex-wrap navbar-outlay">
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
                          color: openDropdown === "shirt-dropdown" ? "yellow" : "white",
                          fontSize: "24px",
                        }}
                      />
                    </span>
                  }
                  id="shirt-dropdown"
                  show={openDropdown === "shirt-dropdown"}
                >
                  <NavDropdown.Item as={NavLink} to="/classes">
                    Class
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/crud-q">
                    FlashCard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/quiz">
                    Quiz
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/shop/product/ao-ba-lo">
                    Folder
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
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
              <Nav.Link onClick={() => navigate("/userprofile")}>
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
