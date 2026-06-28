import "./Header.scss";
import { useEffect, useState } from "react";
import { Bell, Search } from "react-feather";
import { FiAlignJustify } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Header({click, setClick}) {
  const { user, logout } = useAuth();

 
  return (
    <header className="common-header-wrapper">
      <div className="header-left">
        <div className="toggle-icon" onClick={() => setClick(!click)}>
          <FiAlignJustify size={30} />
        </div>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="user-details">
            <h6>{user?.name || "John Doe"}</h6>
          </div>
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User"
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
}