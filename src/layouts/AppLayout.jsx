import React, { useEffect, useState } from "react";
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
  const mini = !isMobile && isAuth && !location.pathname.startsWith('/account/messages');
  const maxi = !isMobile && isAuth && !location.pathname.startsWith('/account/messages') && (chatOpen || id);
  const url = location.pathname;
  useEffect(() => {
    setId(false)
    setChatOpen(false)
  }, [url])
  return (
    <>
      <ScrollRestoration />
      <Header />
      <ScrollToTopButton maxi={maxi} mini={mini} />
      {maxi && <MenuChatOpen chatOpen={chatOpen} setChatOpen={setChatOpen} id={id} setId={setId} />}
      {

        (isMobile)
          ? <Outlet />
          : <Row className="justify-content-between">
            <Col className={full ? "menu-nav-conteiner full" : "menu-nav-conteiner"}>
              <Menu full={full} setFull={setFull} />
            </Col>
            <Col className={full ? "panel-open" : "panel-closed"}>
              <Outlet />
            </Col>
            <Col className="menu-chat-conteiner">
              {mini && <MenuChat chatOpen={chatOpen} setChatOpen={setChatOpen} id={id} setId={setId} />}
            </Col>
          </Row>
      }
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
