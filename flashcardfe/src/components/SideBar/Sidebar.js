import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaHome, FaFolderOpen, FaRegLaughWink, FaGithub } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { FaRegMessage } from "react-icons/fa6";

import logoImg from "../../assests/logo-cut.png";
import "./Sidebar.scss";

const SideBar = (props) => {
  const { classData } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [tfReactIcon, settfReactIcon] = useState(true);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
    settfReactIcon(!tfReactIcon);
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      className="side"
      style={{ backgroundColor: "#0A092D" }}
    >
      <SidebarHeader>
        <Menu>
          <MenuItem onClick={handleCollapsedChange} icon={collapsed ? <GoArrowRight /> : <GoArrowLeft />}>
            <div style={{ padding: "9px", fontWeight: "bold", fontSize: 14, letterSpacing: "1px" }}>
              Quizone
            </div>
          </MenuItem>
        </Menu>
        <Menu className={tfReactIcon ? "reactIconFa" : ""}>
          <MenuItem>
            <img
              className="logoimg"
              src={logoImg}
              alt="Logo"
              style={{ marginLeft: "3.6px", width: "100px", height: "auto", display: "block", margin: "0 auto" }}
            />
          </MenuItem>
        </Menu>
      </SidebarHeader>

      <SidebarContent>
  <Menu iconShape="square">
    <MenuItem icon={<FaHome />}>
      <Link to="/" className="nav-link">Home</Link>
    </MenuItem>
    <MenuItem icon={<FaFolderOpen />}>Your flashcard</MenuItem>
    <hr />
    <MenuItem icon={<FaFolderOpen />}>Your classes</MenuItem>
    <MenuItem icon={<FaRegMessage  />}>
    <Link to="/messagePage" className="">Your Message</Link></MenuItem>
    {classData.map((classItem) => (
      <MenuItem key={classItem._id}> 
        <Link to={`/classes/${classItem._id}`} className="nav-link">{classItem.name}</Link>
      </MenuItem>
    ))}
  </Menu>
  <Menu iconShape="circle">
    <SubMenu icon={<FaRegLaughWink />} title="Admin Manage">
      <MenuItem>
        <Link to="User" className="nav-link">User</Link>
      </MenuItem>
      <MenuItem>
        <Link to="Product" className="nav-link">Product</Link>
      </MenuItem>
      <MenuItem>
        <Link to="manage-question" className="nav-link">Manage Questions</Link>
      </MenuItem>
    </SubMenu>
  </Menu>
</SidebarContent>


      <SidebarFooter style={{ textAlign: "center" }}>
        <Menu>
          <MenuItem>
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                GitHub
              </span>
            </a>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
