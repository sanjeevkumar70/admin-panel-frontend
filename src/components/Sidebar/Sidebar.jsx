import "./Sidebar.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GrClose } from "react-icons/gr";

import { FaChevronDown, FaChevronUp, FaTachometerAlt, FaBlog, FaFolderOpen, FaBullhorn, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";


export default function Sidebar({ click, setClick }) {
  const { logout, user } = useAuth();

  const [blogOpen, setBlogOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);


  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-heading-wrap">
        <div>
          Admin panel
        </div>
        <div className="close-button" onClick={() => setClick(!click)}>
          <GrClose size={25} />
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/">
          <FaTachometerAlt className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        {/* {user?.role === "admin" && (
          <NavLink to="/category">Category</NavLink>
        )} */}

        {/* Blog Menu */}
        <div className="menu-item">
          <div
            className="menu-title"
            onClick={() => setBlogOpen(!blogOpen)}
          >
            <div className="menu-title-left">
              <FaBlog className="menu-icon" />
              <span>Blog</span>
            </div>

            <span className="arrow-icon">
              {blogOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {blogOpen && (
            <div className="submenu">
              <NavLink to="/blog-category">
                <FaFolderOpen className="submenu-icon" />
                <span>Category</span>
              </NavLink>

              <NavLink to="/blog">
                <FaBlog className="submenu-icon" />
                <span>Blog List</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Campaign Menu */}
        <div className="menu-item">
          <div
            className="menu-title"
            onClick={() => setCampaignOpen(!campaignOpen)}
          >
            <div className="menu-title-left">
              <FaBullhorn className="menu-icon" />
              <span>Campaign</span>
            </div>

            <span className="arrow-icon">
              {campaignOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {campaignOpen && (
            <div className="submenu">
              <NavLink to="/category-campaign">
                <FaLayerGroup className="submenu-icon" />
                <span>Category</span>
              </NavLink>

              <NavLink to="/campaign">
                <FaBullhorn className="submenu-icon" />
                <span>Campaign List</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}