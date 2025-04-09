import React from "react";
import "./header.scss";
import { GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Logo from "../../assets/icon/logo";

export default function Header() {
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
        <div className="header-search-bar-main">
          <div className="header-search-icon">
            <FiSearch fontSize={20} />
          </div>
          <input type="text" placeholder="What do you want to play?" />
        </div>
      </div>
      <div></div>
    </header>
  );
}
