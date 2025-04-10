import React, { useState } from "react";
import "./header.scss";
import { GoHomeFill } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/icon/logo";
import { FiSearch } from "react-icons/fi";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header>
      <div className="header-logo">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
      </div>
      <div className="header-center">
        <NavLink to={"/"}>
          <div className="header-home-icon">
            <GoHomeFill fontSize={20} />
          </div>
        </NavLink>
        <form onSubmit={handleSearch} className="search-form">
          <div className="header-search-bar-main">
            <div className="header-search-icon">
              <FiSearch fontSize={20} />
            </div>
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div></div>
    </header>
  );
}
