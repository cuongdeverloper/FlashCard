import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaReact } from 'react-icons/fa';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
//https://react-icons.github.io/react-icons/
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss'

const SideBar = (props) => {
    const { image } = props;
    // const{handleToggleSidebar} = props;
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);
    const [tfReactIcon, settfReactIcon] = useState(true);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
        settfReactIcon(!tfReactIcon);
    };

    return (
        <>
            <ProSidebar
                // image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                
                // handleToggleSidebar={handleToggleSidebar}
                // handleCollapsedChange={handleCollapsedChange}
            >

                <SidebarHeader>
                    <Menu>

                        <MenuItem
                            onClick={handleCollapsedChange}
                            icon={collapsed ? <GoArrowRight /> : <GoArrowLeft />}
                        >
                            <div
                                style={{
                                    padding: "9px",
                                    // textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    letterSpacing: "1px"
                                }}
                            >
                                Quizone
                            </div>
                        </MenuItem>


                    </Menu>
                    <Menu className={tfReactIcon ? 'reactIconFa' : ''}>
                        <MenuItem
                            icon={<FaReact color='rgb(18 199 241)' size={'2.5em'} />}>
                        </MenuItem>
                    </Menu>

                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape='square'>
                        <MenuItem icon={<FaTachometerAlt />} suffix={<span className="badge red" >Item1</span>}>
                             <Link to='/' className='nav-link'>Home</Link>
                        </MenuItem>
                        <MenuItem icon={<FaGem />}> React JS </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">

                        <SubMenu icon={<FaRegLaughWink />} suffix={<span className="badge yellow">3</span>} title='Admin Manage'>
                            <MenuItem>                            
                                <Link to='User' className='nav-link'>User</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='Product' className='nav-link'>Product</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='manage-question' className='nav-link'>Item6</Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <Menu>
                        <MenuItem>
                            <a
                                href="https://github.com/azouaoui-med/react-pro-sidebar"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer">
                                <FaGithub />
                                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Item7
                                </span>
                            </a>
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar