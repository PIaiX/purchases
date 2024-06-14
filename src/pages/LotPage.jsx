import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useForm, useWatch } from 'react-hook-form';
import { FiAlertTriangle, FiShare } from "react-icons/fi";
import { PiCaretLeftLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import ReviewCard from '../components/ReviewCard';
import Chat from '../components/chat/Chat';
import StarIcon from '../components/svg/StarIcon';
import Input from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import Select from '../components/utils/Select';
import socket from '../config/socket';
import { getImageURL } from '../helpers/all';
import { createMessage, getMessages } from '../services/message';
import { createOrder } from '../services/order';
import { getProduct } from '../services/product';
import { NotificationManager } from 'react-notifications';
import { refreshAuth } from '../services/auth';
import useIsMobile from '../hooks/isMobile';

const LotPage = () => {
    const userId = useSelector(state => state.auth?.user?.id);
    const { lotId } = useParams()
    const [showShare, setShowShare] = useState(false);
    const [scrollOff, setScrollOff] = useState(true);
    const dispatch = useDispatch();
    const [products, setProducts] = useState({
        loading: true,
        items: [],
    });
    const [isPaymentPending, setPaymentPending] = useState(false);
    const navigate = useNavigate();
    const getPage = () => {

        getProduct({ id: lotId })
            .then((res) => {
                setProducts((prev) => ({
                    prev,
                    loading: false,
                    items: res.product,
                    reviews: res.reviews,
                    nickname: res?.product?.param?.data?.nickname,
                }));
                setValue("toId", res.product.userId);
                setValuePay("productId", res.product.id)
            })
            .catch(() => setProducts((prev) => ({ ...prev, loading: false })));

    };
    useEffect(() => {
        getPage();
    }, [lotId]);
    const { control, reset, setValue } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: {
            fromId: userId,
        },
    });

    const data = useWatch({ control });
    const [messages, setMessages] = useState({
        loading: true,
        items: [],
    });

    const onLoadChat = (chatPage) => {
        setMessages((prev) => ({ ...prev, load: false }))
        getMessages({ ...data, page: chatPage, size: 50 })
            .then((res) => {
                setMessages((prev) => ({
                    ...prev,
                    loading: false,
                    items: [...messages.items, ...res.messages.items],
                    hasMore: chatPage ? (chatPage < res.messages.pagination.totalPages) ? true : false : true,
                    dialog: res.dialog,
                    load: true,
                }));
                setValue("id", res.dialog.id);
            })
            .catch(() => {
                setMessages((prev) => ({ ...prev, loading: false, load: true, }))
            });
    };
    useEffect(() => {
        if (data.toId && userId != products.items?.user?.id && data.toId != userId) {
            setMessages(() => ({ items: [], loading: true }))
            onLoadChat();
        }
    }, [data.toId]);
    useEffect(() => {
        const handleMessage = (data) => {

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
        };

        if (data?.id) {
            socket.emit("createRoom", "message/" + data.id);
            socket.on("message", handleMessage);
            socket.on("report", handleMessage);

            return () => {
                socket.off("message", handleMessage);
                socket.off("report", handleMessage);
                socket.emit("removeRoom", "message/" + data.id);
            };
        }
    }, [data?.id]);

    const onNewMessage = useCallback(
        (text) => {

            createMessage({ ...data, text })
                .then((res) => {
                    if (!data?.id) {
                        getMessages(data)
                            .then((res) => {
                                setMessages((prev) => ({
                                    ...prev,
                                    loading: false,
                                    items: res.messages.items,
                                    dialogId: res.dialog.id,
                                    dialog: res.dialog,
                                }));
                                setValue("id", res.dialog.id);
                            })
                            .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
                    }
                })

        },
        [data]
    );
    const {
        control: controlPay,
        register: registerPay,
        setValue: setValuePay,
        reset: resetPay,
        formState: { errors: errorsPay, isValid: isValidPay },
        handleSubmit: handleSubmitPay,
    } = useForm({
        mode: "all",
        reValidateMode: "onSubmit",
        defaultValues: {
            count: 1,
        },
    });
    const pay = useWatch({ control: controlPay });
    const onPay = useCallback(
        (pay) => {
            if (!pay.type || pay.type <= 0) {
                return NotificationManager.error("Выберите способ оплаты");
            }
            if (!pay.count || pay.count < 1) {
                return NotificationManager.error("Укажите количество товара");
            }
            if (products.items.count - pay.count < 0) {
                return NotificationManager.error(
                    "У продавца недостаточно кол-ва данного товара"
                );
            }
            setPaymentPending(true);
            createOrder(pay)
                .then((res) => {
                    resetPay({ ...pay, nickname: null, count: 1, type: null });
                    setPaymentPending(false);
                    getPage();
                    dispatch(refreshAuth());
                    NotificationManager.success("Куплено");
                    if (!data?.id) {
                        getMessages(data)
                            .then((res) => {
                                setMessages((prev) => ({
                                    ...prev,
                                    loading: false,
                                    items: res.messages.items,
                                    dialogId: res.dialog.id,
                                    dialog: res.dialog,
                                }));
                                setValue("id", res.dialog.id);
                            })
                            .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
                    }
                })
                .catch((err) => {
                    setPaymentPending(false);
                    NotificationManager.error(
                        err?.response?.data?.error ?? "Ошибка при покупке"
                    );
                });
        },
        [products.items.count]
    );

    const user =
        messages?.dialog ? (userId == messages?.dialog?.to?.id
            ? messages?.dialog?.from
            : messages?.dialog?.to)
            : products?.items?.user

    const onTask = useCallback(() => {
        createTask({ type: "report", userId: user.id })
            .then(() => {
                NotificationManager.success("Жалоба отправлена");

            })
            .catch((err) => {
                NotificationManager.error(
                    err?.response?.data?.error ?? "Ошибка при отправке"
                );
            });
    }, [user]);
    if (products.loading) {
        return <Loader full />;
    }
    return (
        <main>
            <Meta title="Лот" />
            <section className='lot-page mb-6'>
                <button type="button" onClick={() => navigate(-1)} className='blue d-flex align-items-center mb-3'>
                    <PiCaretLeftLight className='fs-15' />
                    <span className='ms-2'>Назад в каталог</span>
                </button>
                <Row>
                    <Col xs={12} lg={8}>
                        <div className="lot-page-box lot-page-grid mb-4">
                            <div className="game">
                                {/* {products?.items?.category?.media &&
                                        <img src={getImageURL(products?.items?.category?.media)} alt="AFK Arena" />
                                    } */}
                                <h6>{products?.items?.category?.title}</h6>
                            </div>

                            <div className='info'>
                                <div className='d-flex align-items-center'>
                                    <span className='tag-gray me-3'>{products?.items?.param?.title}</span>
                                    {
                                        (products?.items?.region?.title) && products?.items?.region.status &&
                                        <span className='tag-green me-3'>{products?.items?.region?.title}</span>
                                    }
                                </div>
                                {products?.items?.server?.title && !products?.items?.param?.data?.serverView &&
                                    <div className='d-flex align-items-center'>
                                        <span>Сервер</span>
                                        <span className='fs-09 pale-blue mx-2'>●</span>
                                        <span>{products?.items?.server?.title}</span>
                                    </div>
                                }
                            </div>
                            {/* <div className='title'>{products?.items?.title} </div> */}
                            <div className='title'>{products?.items?.title}</div>
                            {products?.items?.status == 0 ? <div className='status'>Закрыт</div> : <div className='status'></div>}
                            {products?.items?.status == -1 ? <div className='status'>Заблокировано</div> : <div className='status'></div>}
                            <div className='date'>
                                <time>{moment(products?.items?.createdAt).format("kk:mm")}</time>
                                <time className='ms-3'>{moment(products?.items?.createdAt).format("DD.MM.YYYY")}</time>
                                {/* <button type='button' className='d-flex fs-14 ms-3'>
                                        <PiWarningLight />
                                    </button> */}
                            </div>

                            <div className="payment align-items-center">
                                {!products?.items?.param?.data?.one &&
                                    <>
                                        <h6>Доступно:</h6>
                                        <h6>{products?.items?.count}</h6>
                                        <Input
                                            value={pay.count}
                                            type={"number"}
                                            label={"Количество"}
                                            name="count"
                                            register={registerPay}
                                        />
                                    </>
                                }
                                <Select
                                    value={pay.type}
                                    title="Выберите способ оплаты"
                                    onClick={e => setValuePay("type", e.value)}

                                    data={[{ value: "online", title: 'Банковская карта' }, { value: "wallet", title: 'Онлайн кошелек' }]}
                                />
                                <Input
                                    value={pay?.nickname ?? ""}
                                    placeholder={'nickname'}
                                    className="nickname me-4"
                                    type="text"
                                    onChange={(e) => setValuePay("nickname", e)}
                                    maxLength={100}
                                />
                                {products?.items?.data?.minCount &&
                                    <Col className="d-flex align-items-center achromat-3" md={12}>
                                        <span className="me-2">Минимум</span>
                                        <span className="me-2">{products?.items?.data?.minCount}</span>
                                        {products?.items?.data?.typeCount && <span className="me-2">{products?.items?.data?.typeCount}.</span>}
                                        <span className="me-2">(требование продавца)</span>
                                    </Col>
                                }
                                <button disabled={!userId || isPaymentPending || userId == products?.items?.user?.id} onClick={handleSubmitPay(onPay)} type='button' className='btn-1'>Оплатить {(pay.count > 0 ? pay.count : 1) * products?.items?.total} ₽</button>
                            </div>

                            <div className='text'>
                                {products?.items?.desc && <p>{products?.items?.desc}</p>}
                            </div>

                            <ul className='specifications'>
                                {products?.items?.options && [...products?.items?.options].reverse().map(e => {
                                    let name = products.items.param.options.find(item => (e?.option?.parent && item.id == e.option.parent));
                                    if (!e.parent) {
                                        return <li>
                                            <span>{e.value ? e?.option?.title : name?.title ? name.title : "Хакатеристика"}</span>
                                            {e.value ? <span>{e?.value}</span> : <span>{e?.option?.title}</span>}
                                        </li>

                                    }
                                })}
                            </ul>
                        </div>

                        <div className="lot-page-box">
                            <div className="px-3 py-2 d-sm-flex justify-content-between align-items-center">
                                <div className="seller">
                                    <Link to={`/trader/${products?.items?.userId}`}>
                                        <img src={getImageURL({ path: products?.items?.user?.media, type: "user", size: "mini" })} alt={products?.items?.user?.nickname} />
                                    </Link>
                                    <Link to={`/trader/${products?.items?.userId}`}>
                                        <h3 className='title-font lh-n mb-0'>{products?.items?.user?.nickname}</h3>
                                    </Link>
                                    <div className='rating ms-3'>
                                        <StarIcon />
                                        {/* <StarRating value={products?.items?.user?.rating} /> */}
                                        <span>{products?.items?.user?.rating != null ? parseFloat(products?.items?.user?.rating).toFixed(1) : "0.0"}</span>
                                    </div>
                                </div>
                                <div className='mt-3 mt-md-0 d-flex align-items-center justify-content-between w-xs-100'>
                                    <div className="d-flex">
                                        <div className="d-flex flex-column align-items-center">
                                            <p className='fs-09 mb-1 mb-sm-2'>Сделки</p>
                                            <p className="fs-15 title-font lh-n">{products?.items?.user?.orderSale}</p>
                                        </div>
                                        <div className='d-flex flex-column align-items-center ms-4'>
                                            <p className='fs-09 mb-1 mb-sm-2'>Лоты</p>
                                            <p className="fs-15 title-font lh-n">{products?.items?.user?.product}</p>
                                        </div>
                                    </div>
                                    <div className='ms-5'>

                                        <button
                                            type="button"
                                            onClick={setShowShare}
                                            className='d-flex gray fs-13 mb-2 mb-sm-3'
                                        >
                                            <FiShare />
                                        </button>
                                        {userId != products?.items?.user?.id &&
                                            <button type='button' className='d-flex gray fs-13'><FiAlertTriangle /></button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {userId != products?.items?.user?.id &&
                                <>
                                    <hr />
                                    <div className="px-3 py-2">
                                        <p className='blue'>Напишите продавцу перед покупкой</p>
                                    </div>
                                    <hr />

                                    {!userId ? (
                                        <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                                            Для отправки сообщений войдите в аккаунт!
                                        </div>
                                    ) : (
                                        <div className="p-0 fs-09">
                                            {products.loading ? (
                                                <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                                                    Загрузка чата...
                                                </div>
                                            ) : (
                                                < Chat
                                                    onLoadChat={onLoadChat}
                                                    setScrollOff={setScrollOff}
                                                    scrollOff={scrollOff}
                                                    messages={messages}
                                                    emptyText="Нет сообщений"
                                                    onSubmit={(e) => onNewMessage(e)}
                                                    onChange={(e) => setValue("text", e)}
                                                    data={data}
                                                    setImage={(e) => setValue("media", Array.from(e))}
                                                />
                                            )}
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className='mt-5 mt-lg-0'>
                        <h2 className='fs-15'>Отзывы</h2>
                        <ul className='list-unstyled'>
                            {products?.reviews?.length > 0 ? products.reviews.map(review => (
                                <li className='mb-3'>
                                    <ReviewCard {...review} />
                                </li>
                            )) : (
                                <div className="d-flex align-items-center justify-content-center mt-4">
                                    <h5>
                                        Нет отзывов
                                    </h5>
                                </div>
                            )
                            }
                        </ul>
                    </Col>
                </Row>
                <Modal show={showShare} onHide={setShowShare} centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <h4 className="mb-3">Профиль продавца</h4>
                        <Input
                            onClick={(e) => e.target.select()}
                            readOnly
                            defaultValue={`${process.env.REACT_APP_SITE_URL}/trader/${products.items.userId}`}
                        />
                    </Modal.Body>
                </Modal>
            </section>
        </main>
    )
}

export default LotPage