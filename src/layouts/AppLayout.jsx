import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/utils/ScrollToTopButton";
import Menu from "../components/Menu"
import useIsMobile from '../hooks/isMobile'
import { Col, Container, Row } from "react-bootstrap";


const AppLayout = () => {
  const isMobile = useIsMobile('991px')
  return (
    <>
      <ScrollRestoration />
      <Header />
      <ScrollToTopButton />
      {

        (isMobile)
          ? <Outlet />
          : <Row className="justify-content-between">
            <Col xl={2} xxl={2}>
              <Menu />
            </Col>
            <Col xl={10}><Outlet /></Col>
          </Row>
      }
      <Footer />
    </>
  );
};

export default AppLayout;
