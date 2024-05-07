import React, { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/utils/ScrollToTopButton";
import Menu from "../components/Menu"
import useIsMobile from '../hooks/isMobile'
import { Col, Container, Row } from "react-bootstrap";
import MenuChat from "../components/MenuChat";
import { useSelector } from "react-redux";


const AppLayout = () => {
  const isMobile = useIsMobile('991px')
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [full, setFull] = useState(true);
  return (
    <>
      <ScrollRestoration />
      <Header />
      <ScrollToTopButton />
      {!isMobile && isAuth && <MenuChat />}
      {

        (isMobile)
          ? <Outlet />
          : <Row className="justify-content-between">
            <Col md={1}>
              <Menu full={full} setFull={setFull} />
            </Col>
            <Col className={full ? "panel-open" : "panel-closed"}>
              <Outlet />
            </Col>
          </Row>
      }
      <Footer />
    </>
  );
};

export default AppLayout;
