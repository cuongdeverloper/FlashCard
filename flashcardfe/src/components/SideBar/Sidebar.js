import React, {useState } from "react";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaHome, FaFolderOpen } from "react-icons/fa";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { FaRegMessage } from "react-icons/fa6";

import logoImg from "../../assests/logo-cut.png";
import "./Sidebar.scss";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const userInfor = useSelector((state) => state.user.account.id);

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
          <MenuItem icon={<FaFolderOpen />}>
            <Link to={`/MyManage/${userInfor}`} className="nav-link">Your flashcard</Link>
          </MenuItem>
          <hr />
          <MenuItem icon={<FaRegMessage />}>
            <Link to="/messagePage" className="">Your Message</Link></MenuItem>
         
        </Menu>
        <Menu iconShape="circle">
          <SubMenu icon={<FaFolderOpen />} title="Your class">
          {classData.map((classItem) => (
            <MenuItem key={classItem._id}>
              <Link to={`/classes/${classItem._id}`} className="nav-link">{classItem.name}</Link>
            </MenuItem>
          ))}
            
          </SubMenu>
        </Menu>
      </SidebarContent>


      <SidebarFooter style={{ textAlign: "center" }}>
        <Menu>
          <MenuItem>

          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
