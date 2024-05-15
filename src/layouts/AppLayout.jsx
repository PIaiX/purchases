import React, { useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/utils/ScrollToTopButton";
import Menu from "../components/Menu"
import useIsMobile from '../hooks/isMobile'
import { Col, Container, Row } from "react-bootstrap";
import MenuChat from "../components/MenuChat";
import { useSelector } from "react-redux";
import MenuChatOpen from "../components/MenuChatOpen";


const AppLayout = () => {
  const isMobile = useIsMobile('991px')
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [full, setFull] = useState(false);
  const [id, setId] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <ScrollRestoration />
      <Header />
      <ScrollToTopButton />
      {!isMobile && isAuth && !location.pathname.startsWith('/account/messages') && <MenuChat chatOpen={chatOpen} setChatOpen={setChatOpen} id={id} setId={setId} />}
      {!isMobile && isAuth && !location.pathname.startsWith('/account/messages') && (chatOpen || id) && <MenuChatOpen chatOpen={chatOpen} setChatOpen={setChatOpen} id={id} setId={setId} />}
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
