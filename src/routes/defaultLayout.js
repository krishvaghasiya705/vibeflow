import React from "react";
import Header from "../common/header";
import Sidesection from "../common/sidesection";
import Audioplayer from "../common/audioplayer";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="default-layout">
      <Header />
      <div className="default-layout-body">
        <Sidesection />
        <div className="default-layout-body-content-main">
          <div className="default-layout-body-content">
            <Outlet />
          </div>
        </div>
      </div>
      <Audioplayer />
    </div>
  );
}
