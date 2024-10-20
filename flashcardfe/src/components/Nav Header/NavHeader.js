import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavHeader.scss";
import { IoPersonCircle } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { FaUserShield } from "react-icons/fa"; // Admin icon
import logoImg from "../../assests/logo.png";
import { IoAddOutline } from "react-icons/io5";
import { Nav, NavDropdown,Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { searchItems } from "../../service/ApiService";
import DarkMode from "../darkmode/DarkMode";
import FontSizeChanger from "../fontsizechange/FontSizeChanger";
import defaultImg from "../../assests/avt.jpg"

const NavHeader = () => {
  const user = useSelector((state) => state.user.account.image)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.account.role); 
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
const iconNav = { fontSize: "20px", color: "#fff" }

const handleToggle = () => {
  setShowDropdown(!showDropdown);
};
const handleClickInside = (e) => {
  e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài và đóng dropdown
};
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
    const results = response.data;
    navigate("/search", { state: { results, query: searchQuery } });
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
                className=" px-3"
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
                  <NavDropdown.Item as={NavLink} to="/create-class">
                    Create Class
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/crud-q">
                    Create FlashCard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/quiz">
                    Create Quiz
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </Navbar.Collapse>

          <Navbar.Collapse>
            <Nav>
              {isAuthenticated ? (
                <>


                  {/* Admin-only icon */}
                  {userRole === "admin" && (
                    <Nav.Link onClick={() => navigate("/admin-manage")}>
                      <FaUserShield style={iconNav} />
                    </Nav.Link>
                    
                  )}
                                    <Dropdown align="end" >
                    
                    <Dropdown.Toggle as="div" className="avatar-button" show={showDropdown}>
                      {/* <IoPersonCircle style={{ fontSize: "40px", color: "#fff", cursor: "pointer" }} /> */}
                      <img src={user || defaultImg} style={{width:'40px', height:'40px', borderRadius:'50px'}} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="profile-dropdown">

                    <Dropdown.Item as="button" onClick={() => navigate("/userprofile")} >
                    <IoPersonCircle style={{ fontSize: "40px", color: "#fff", cursor: "pointer" }} />
                        <p>Profile</p>
                      </Dropdown.Item>
                      <Dropdown.Item as="button" onClick={handleClickInside}>
                        <DarkMode />
                      </Dropdown.Item>

                      <Dropdown.Item as="button" onClick={handleClickInside}>
                        <FontSizeChanger />
                      </Dropdown.Item>

                      <Dropdown.Item as="button"  onClick={() => navigate("/logout")}>
                    <h5>logout</h5>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavHeader;
