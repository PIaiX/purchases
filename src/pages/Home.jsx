import React, { useCallback, useEffect, useState } from "react";
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
import Chat from "../components/chat/Chat";
import Loader from "../components/utils/Loader";
import socket from "../config/socket";
import { declOfNum } from "../helpers/all";
import useIsMobile from '../hooks/isMobile';
import { createMessageGeneral, getMessagesGeneral } from "../services/message";
import { useGetArticlesQuery, useGetGamesQuery, useGetRecommendsQuery, useGetSalesQuery } from "../store/reducers/homeQuery";

const Home = () => {
  const isMobileLG = useIsMobile('1109px');
  const category = useGetGamesQuery();
  const recommends = useGetRecommendsQuery();
  const articles = useGetArticlesQuery();
  const sales = useGetSalesQuery();
  const [games, setGames] = useState({ items: [], data: [], loading: true });

  useEffect(() => {
    var uniqueLetters = new Set();

    category?.data?.forEach(word => {
      let firstLetter = word.title.charAt(0).toUpperCase();

      if (!uniqueLetters.has(firstLetter)) {
        uniqueLetters.add(firstLetter);
      }
    });

    const alphabet = Array.from(uniqueLetters).sort();
    setGames(prev => ({ ...prev, items: category.data, data: alphabet, loading: false }));
  }, [category]);






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


  }, []);

  useEffect(() => {
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


  }, [userId]);

  const onNewMessage = useCallback(
    (text) => {
      createMessageGeneral({ ...data, text });
    },
    [data]
  );

  const declension = declOfNum(messages?.count, ['участник', 'участника', 'участников']);

  // if (articles.isLoading || sales.isLoading || category.isLoading || recommends.isLoading) {
  //   return <Loader full />;
  // }

  return (
    <main>
      <Meta title="Rush2Play" />
      <Container>
        <section className="mb-5">
          <MainSlider data={sales?.data?.home?.items} />
        </section>
      </Container>
      <CatalogSection games={games} />
      {articles?.data?.pagination?.totalItems > 0 && (
        <Container>
          <BlogSection articles={articles.data} />
        </Container>)

      }
      {
        (!isMobileLG) &&
        <section className='sec-bottom mb-md-5'>
          <Container className="">
            <Row>
              <Col xs={12} md={8}>
                <section className="sec-chat mb-5">
                  <h2>Общий чат</h2>
                  <div className="sec-chat-count">
                    <div className="num">{messages.count}</div>
                    <div className="text">{declension} online</div>
                  </div>
                </section>
                <Chat
                  general="general"
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
                    {recommends?.data?.items && recommends?.data?.items?.map(item => (
                      <SwiperSlide>
                        <OfferCard {...item} />
                      </SwiperSlide>
                    ))}
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
