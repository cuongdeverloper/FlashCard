import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MenuShop = () => {
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
        <div className='d-flex flex-wrap navbar-outlay'>
            {/* Áo Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('shirt-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo" 
                    id="shirt-dropdown" 
                    show={openDropdown === 'shirt-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/shirt'>Shirt</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-so-mi'>Áo sơ mi</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-ba-lo'>Áo ba lỗ</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Áo Khoác Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('jacket-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo khoác" 
                    id="jacket-dropdown" 
                    show={openDropdown === 'jacket-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-khoac'>Áo khoác</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-len'>Áo len</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-sweater'>Áo sweater</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Áo Thể Thao Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('sports-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Áo thể thao" 
                    id="sports-dropdown" 
                    show={openDropdown === 'sports-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-bong-da-nam'>Áo bóng đá nam</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-bong-da-nu'>Áo bóng đá nữ</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-giu-nhiet'>Áo giữ nhiệt</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-mua-he'>Áo mùa hè</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/ao-khoac-giu-nhiet'>Áo khoác giữ nhiệt</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Quần Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('pants-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Quần" 
                    id="pants-dropdown" 
                    show={openDropdown === 'pants-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/quan-jean'>Quần jean</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/quan-short'>Quần short</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/quan-the-thao'>Quần thể thao</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/quan-bai-bien'>Quần bãi biển</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/quan-kaki'>Quần kaki</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Phụ Kiện Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('accessories-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Phụ kiện" 
                    id="accessories-dropdown" 
                    show={openDropdown === 'accessories-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/balo'>Balo</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/non'>Nón</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/vi-da'>Ví da</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/dong-ho'>Đồng hồ</NavDropdown.Item>
                </NavDropdown>
            </div>

            {/* Giày Dép Dropdown */}
            <div 
                className="text-white px-3"
                onMouseEnter={() => handleMouseEnter('shoes-dropdown')}
                onMouseLeave={handleMouseLeave}
            >
                <NavDropdown 
                    title="Giày dép" 
                    id="shoes-dropdown" 
                    show={openDropdown === 'shoes-dropdown'}
                >
                    <NavDropdown.Item as={NavLink} to='/shop/product/giay-the-thao'>Giày thể thao</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/giay-da-bong'>Giày đá bóng</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/shop/product/dep'>Dép</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    );
}

export default MenuShop;
