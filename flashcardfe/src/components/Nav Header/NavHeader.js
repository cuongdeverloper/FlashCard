import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavHeader.scss';
import MenuShop from './MenuShop.js';
import { IoPersonCircle } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import logoImg from '../../assests/OIP.jpg';

const NavHeader = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    const cart1 = useSelector(state => state.cart);  // Adjust according to your state structure


    return (
        <div className="Header-container" style={{zIndex:'1000',width:'100%'}}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className='container-navbar'>
                    <Navbar.Brand onClick={() => navigate('/')} style={{ height: '100%', width: 'auto' }}>
                        <img style={{ height: '100%', width: 'auto' }} src={logoImg} alt="FlashCardLogo Logo" />
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Nav className="me-auto"> */}
                        {/* <MenuShop /> */}
                        {/* </Nav> */}
                    </Navbar.Collapse>
                    <Navbar.Collapse>
                        <Nav>
                            {isAuthenticated ? (
                                <NavLink to='/logout' className='nav-link'>Logout</NavLink>
                            ) : (
                                <NavLink to='/login' className='nav-link'>Login</NavLink>
                            )}
                            <Nav.Link onClick={() => navigate('/user')}>
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
}

export default NavHeader;
