import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/utils/ScrollToTopButton";

const AppLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Header />
      <ScrollToTopButton />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
