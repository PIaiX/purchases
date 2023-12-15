import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { Mousewheel, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogSection from "../components/BlogSection";
import CatalogSection from "../components/CatalogSection";
import MainSlider from "../components/MainSlider";
import Meta from "../components/Meta";
import OfferCard from "../components/OfferCard";
import Chat1 from "../components/chat/Chat1";
import Loader from "../components/utils/Loader";
import socket from "../config/socket";
import useIsMobile from '../hooks/isMobile';
import { getArticles } from "../services/article";
import { getGames } from "../services/game";
import { createMessageGeneral, getMessagesGeneral } from "../services/message";
import { getSales } from "../services/sales";

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

  const [games, setGames] = useState({ items: [], data: [], loading: true });


  useEffect(() => {
    getGames()
      .then((res) => {
        var uniqueLetters = new Set();

        res.forEach(word => {
          let firstLetter = word.title.charAt(0).toUpperCase();

          if (!uniqueLetters.has(firstLetter)) {
            uniqueLetters.add(firstLetter);
          }
        });

        const alphabet = Array.from(uniqueLetters).sort();
        setGames(prev => ({ ...prev, items: res, data: alphabet, loading: false }));
      }
      )
  }, []);

  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const [articles, setArticles] = useState({
    loading: true,
    items: [],
  });
  useEffect(() => {
    getArticles({ page: currentPage })
      .then((res) => {
        setArticles((prev) => ({
          prev,
          loading: false,
          ...res,
        }))
        setCurrentPage(res.pagination.currentPage)
      })
      .catch(() => setArticles((prev) => ({ ...prev, loading: false })));
  }, [currentPage]);





  //Chat


  const userId = useSelector(state => state.auth?.user?.id);

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: "general",
    },
  });

  const data = useWatch({ control });

  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });

  useEffect(() => {
    if (data?.id) {
      getMessagesGeneral()
        .then((res) =>
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: res.messages.items,
            count: res.countOnline,
          }))
        )
        .catch(() => setMessages((prev) => ({ ...prev, loading: false })));

    }
  }, [data?.id]);

  useEffect(() => {
    if (data?.id) {
      socket.emit("createRoom", "message/" + data.id);

      socket.on("message", (data) => {

        if (data) {
          setMessages((prev) => ({
            ...prev,
            loading: false,
            items: [
              data,
              ...prev.items.map((e) => {
                if (e?.userId) {
                  e.view = true;
                }
                return e;
              }),
            ],
          }));
        }
      });

      return () => {
        socket.off("message");
      };
    }

  }, [data?.id]);

  const onNewMessage = useCallback(
    (text) => {
      createMessageGeneral({ ...data, text });
    },
    [data]
  );



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
      <CatalogSection games={games} />

      <Container>
        <BlogSection articles={articles} onPageChange={onPageChange} />
      </Container>

      {
        (!isMobileLG) &&
        <section className='sec-bottom mb-md-5'>
          <Container className="">
            <Row>
              <Col xs={12} md={8}>
                <section className="sec-chat">
                  <h2>Общий чат</h2>
                  <div className="sec-chat-count">
                    <div className="num">{messages.count}</div>
                    <div className="text">участника online</div>
                  </div>
                </section>
                <Chat1
                  messages={messages}
                  emptyText="Нет сообщений"
                  onSubmit={(e) => onNewMessage(e)}
                  onChange={(e) => setValue("text", e)}
                />

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
