import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/header";
import Sidesection from "../common/sidesection";
import Audioplayer from "../common/audioplayer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="default-layout">
        <Sidesection />
        <div className="default-layout-body-content-main">
          <div className="default-layout-body-content">
            <Outlet />
          </div>
        </div>
      </main>
      <Audioplayer />
    </>
  );
}
