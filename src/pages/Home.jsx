import React, { useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Mousewheel, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogSection from "../components/BlogSection";
import CatalogSection from "../components/CatalogSection";
import MainSlider from "../components/MainSlider";
import OfferCard from "../components/OfferCard";
import ChatGeneral from "../components/chat/ChatGeneral";
import Loader from "../components/utils/Loader";
import useIsMobile from '../hooks/isMobile';
import { getSales } from "../services/sales";
import Meta from "../components/Meta";

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
    return <Loader />;
  }

  return (
    <main>
      <Meta title="Rush2Play" />
      <Container>
        <section className="mb-5">
          <MainSlider data={sales.home.items} />
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
                  <ChatGeneral />
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
