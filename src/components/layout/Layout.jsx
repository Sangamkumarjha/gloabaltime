import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-content py-6 mt-24 min-h-screen text-white">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;