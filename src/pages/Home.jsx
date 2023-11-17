import React, { useLayoutEffect, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlogSection from "../components/BlogSection";
import MainSlider from "../components/MainSlider";
import Loader from "../components/utils/Loader";
import Chat from "../components/chat/Chat";
import OfferCard from "../components/OfferCard";
import CatalogSection from "../components/CatalogSection";
import { getSales } from "../services/sales";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import useIsMobile from '../hooks/isMobile';
import axios from 'axios';

const Home = () => {
  const isMobileLG = useIsMobile('1109px');


  const [sales, setSales] = useState({
    loading: true,
    home: [],
    ad: [],
  });

  useLayoutEffect(() => {
    getSales()
      .then(
        (res) =>
          res &&
          setSales((prev) => ({
            ...prev,
            loading: false,
            ...res,
          }))
      )
      .finally(() => setSales((prev) => ({ ...prev, loading: false })));
  }, []);

  if (sales.loading) {
    return <Loader full />;
  }

  return (
    <main>
      <Container>
        <section className="mb-5">
          {/* <MainSlider data={sales.home.items} /> */}
        </section>
      </Container>

      <CatalogSection />

      <Container>
        <BlogSection />
      </Container>

      {
        (!isMobileLG) &&
        <section className='sec-bottom mb-md-5'>
          <Container className="">
            <Row>
              <Col xs={12} md={8}>
                <section className="sec-chat">
                  <h2>Общий чат</h2>
                  <Chat />
                  <div className="sec-chat-count">
                    <div className="num">102</div>
                    <div className="text">участника online</div>
                  </div>
                </section>
              </Col>
              <Col xs={12} md={4}>
                <section className="sec-popular">
                  <h2>Популярные объявления</h2>
                  <Swiper
                    modules={[Scrollbar, Mousewheel]}
                    className='offers-slider'
                    spaceBetween={30}
                    slidesPerView={'auto'}
                    direction={'vertical'}
                    scrollbar={{ draggable: true }}
                    mousewheel={{ releaseOnEdges: true }}
                  >
                    <SwiperSlide>
                      <OfferCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <OfferCard />
                    </SwiperSlide>
                  </Swiper>
                </section>
              </Col>
            </Row>
          </Container>
        </section>
      }

    </main>
  );
};

export default Home;
