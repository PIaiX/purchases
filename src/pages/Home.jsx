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
  const isMobileLG = useIsMobile('991px');
  const category = useGetGamesQuery();
  const recommends = [];
  // useGetRecommendsQuery();
  const articles = useGetArticlesQuery();
  const sales = useGetSalesQuery();


  const [messages, setMessages] = useState({
    loading: true,
    items: [],
  });
  const onLoadChat = (chatPage) => {
    setMessages((prev) => ({ ...prev, load: false }))
    getMessagesGeneral({ page: chatPage, size: 50 })
      .then((res) => {
        setMessages((prev) => ({
          ...prev,
          loading: false,
          items: [...messages.items, ...res.messages.items],
          hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : res.messages.pagination.totalPages > 1 ? true : false,
          count: res.countOnline,
          load: true,
        }));
      })
      .catch(() => {
        setMessages((prev) => ({ ...prev, loading: false, load: true, }))
      });
  };
  useEffect(() => {
    onLoadChat();
  }, []);

  const userId = useSelector(state => state.auth?.user?.id);

  const { control, reset, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      id: "general",
    },
  });

  const data = useWatch({ control });


  useEffect(() => {
    socket.emit("createRoom", "message/" + data.id);

    socket.on("message", (data) => {
      setMessages(prev => {
        if (data.status) {
          return {
            ...prev,
            loading: false,
            items: [data, ...prev.items],
          };
        } else {
          const messageIndex = prev.items.findIndex(item => item.id === data.id);

          if (messageIndex !== -1) {
            const updatedMessages = [...prev.items];
            updatedMessages[messageIndex] = data;

            return {
              ...prev,
              loading: false,
              items: updatedMessages,
            };
          }

          return prev;
        }
      });
    });

    return () => {
      socket.emit("removeRoom", "message/" + data.id);
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

  if (category?.isLoading || articles.isLoading || sales.isLoading) {
    return <Loader />;
  }
  return (
    <main>
      <Meta title="Rush2Play" />
      {sales?.data?.home && sales?.data?.home?.items?.length > 0 &&
        < Container className="home-slider mb-5">
          <Row className='gx-0 align-items-center'>
            <Col lg={3} xxl={4}>
              <h3>Играй с удовольствием <br className='d-none d-lg-inline' /> в любимые игры</h3>
            </Col>
            <Col lg={9} xxl={8}>
              <MainSlider />
            </Col>
          </Row>
        </Container>
      }
      <CatalogSection games={category?.data} />
      {
        articles?.data?.pagination?.totalItems > 0 && (
          <Container>
            <BlogSection articles={articles.data} />
          </Container>)

      }
      {
        (!isMobileLG) &&
        <section className='sec-bottom'>
          <Container className="">
            <Row>
              <Col xs={12} md={8}>
                <section className="sec-chat">
                  <div className="sec-chat-top">
                    <div className="sec-chat-top-count">
                      <div className="num">{messages.count}</div>
                      <div className="text">{declension} online</div>
                    </div>
                    <h2>Общий чат</h2>
                  </div>

                  <Chat
                    onLoadChat={onLoadChat}
                    general="general"
                    messages={messages}
                    emptyText="Нет сообщений"
                    onSubmit={(e) => onNewMessage(e)}
                    onChange={(e) => setValue("text", e)}
                  />
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

    </main >
  );
};

export default Home;
