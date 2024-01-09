import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useForm, useWatch } from 'react-hook-form';
import { FiAlertTriangle, FiShare } from "react-icons/fi";
import { PiCaretLeftLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
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

const LotPage = () => {
    const userId = useSelector(state => state.auth?.user?.id);
    const { lotId } = useParams()
    const [count, setCount] = useState();
    const [showShare, setShowShare] = useState(false);
    const [products, setProducts] = useState({
        loading: true,
        items: [],
    });

    useEffect(() => {
        getProduct({ id: lotId })
            .then((res) => {
                setProducts((prev) => ({
                    prev,
                    loading: false,
                    items: res.product,
                    reviews: res.reviews,
                }))
                setValue("toId", res.product.userId);
            })
            .catch(() => setProducts((prev) => ({ ...prev, loading: false })));
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
    useEffect(() => {
        setValue("id", messages.dialogId);
    }, [messages.dialogId]);

    useEffect(() => {
        if (data.toId && userId != products.items.user.id) {
            getMessages(data)
                .then((res) => {
                    setMessages((prev) => ({
                        ...prev,
                        loading: false,
                        items: res.messages.items,
                        dialogId: res.dialog.id
                    }))
                }
                )
                .catch(() => setMessages((prev) => ({ ...prev, loading: false })));
        }
    }, [data.toId]);
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
            createMessage({ ...data, text });
        },
        [data]
    );
    const {
        control: controlPay,
        register: registerPay,
        setValue: setValuePay,
        reset: resetPay,
        formState: {
            errors: errorsPay,
            isValid: isValidPay
        },
        handleSubmit: handleSubmitPay,
    } = useForm({
        mode: "all",
        reValidateMode: "onSubmit",
        defaultValues: {
            productId: lotId
        },
    });
    const pay = useWatch({ control: controlPay })
    const onPay = useCallback((pay) => {
        if (!pay.count || pay.count <= 0) {
            return NotificationManager.error(
                "Укажите количество"
            )
        }
        if (!pay.type || pay.type <= 0) {
            return NotificationManager.error(
                "Выберите способ оплаты"
            )
        }
        if (products.items.count - pay.count < 0) {
            return NotificationManager.error(
                "У продавца недостаточно кол-ва данного товара"
            )
        }
        createOrder(pay)
            .then((res) => {
                NotificationManager.success("Куплено");
                resetPay()
            })
            .catch((err) => {
                NotificationManager.error(
                    err?.response?.data?.error ?? "Ошибка при покупке"
                );
            });
    }, [products.items.count]);
    if (products.loading) {
        return <Loader full />;
    }
    return (
        <main>
            <Meta title="Лот" />
            <section className='lot-page mb-6'>
                <Container>
                    <Link to={`/game/${products.items.categoryId}`} className='blue d-flex align-items-center mb-3'>
                        <PiCaretLeftLight className='fs-15' />
                        <span className='ms-2'>Назад в каталог</span>
                    </Link>

                    <Row>
                        <Col xs={12} lg={8}>
                            <div className="lot-page-box lot-page-grid mb-4">
                                <div className="game">
                                    {products?.items?.category?.media &&
                                        <img src={getImageURL(products?.items?.category?.media)} alt="AFK Arena" />
                                    }
                                    <h6 className='mt-2'>{products?.items?.category?.title}</h6>
                                </div>

                                <div className='info'>
                                    <div className='d-flex align-items-center'>
                                        <span className='tag-gray me-3'>{products?.items?.param?.title}</span>
                                        <span className='tag-green me-3'>{products?.items?.region?.title}</span>
                                    </div>
                                    {products?.items?.title &&
                                        <div className='d-flex align-items-center'>
                                            <span>Сервер</span>
                                            <span className='fs-09 pale-blue mx-2'>●</span>
                                            <span>{products?.items?.server?.title}</span>
                                        </div>
                                    }
                                </div>

                                <div className='title'>{products?.items?.title} </div>

                                <div className='date'>
                                    <time>{moment(products?.items?.createdAt).format("kk:mm")}</time>
                                    <time className='ms-3'>{moment(products?.items?.createdAt).format("DD.MM.YYYY")}</time>
                                    {/* <button type='button' className='d-flex fs-14 ms-3'>
                                        <PiWarningLight />
                                    </button> */}
                                </div>

                                <div className="payment align-items-center">

                                    <h6 className='me-2'>Доступно:</h6>
                                    <h6 className='me-4'>{products?.items?.count}</h6>
                                    <Input
                                        value={pay.count}
                                        className='me-4'
                                        type={"text"}
                                        label={"Количество"}
                                        name="count"
                                        register={registerPay}
                                    />
                                    <Select
                                        value={pay.type}
                                        className={"me-md-4"}
                                        title="Выберите способ оплаты"
                                        onClick={e => setValuePay("type", e.value)}

                                        data={[{ value: "online", title: 'Банковская карта' }, { value: "wallet", title: 'Онлайн кошелек' }]}
                                    />
                                    <button onClick={handleSubmitPay(onPay)} type='button' className='btn-1'>Оплатить {(pay.count > 0 ? pay.count : 1) * products?.items?.price} ₽</button>
                                </div>

                                <div className='text fs-09'>
                                    <p>{products?.items?.desc}</p>
                                </div>

                                <ul className='specifications'>
                                    {products?.items?.param?.options && products?.items?.param?.options.map(e => {
                                        let name = products.items.param.options.find(item => (!item.parent && item.id == e.id));

                                        if (!e.parent) {
                                            let options = products.items.options.find(item => (item.option.parent == name.id));
                                            return <li>
                                                <span>{name.title}</span>
                                                <span>{options.option.title}</span>
                                            </li>

                                        }
                                    })}
                                </ul>
                            </div>

                            <div className="lot-page-box">
                                <div className="px-3 py-2 d-sm-flex justify-content-between align-items-center">
                                    <div className="seller">
                                        <Link to={`/profile/${products?.items?.userId}`}>
                                            <img src={getImageURL(products?.items?.user)} alt="Weatherwax" />
                                        </Link>
                                        <Link to={`/profile/${products?.items?.userId}`}>
                                            <h3 className='title-font lh-n mb-0'>{products?.items?.user?.nickname}</h3>
                                        </Link>
                                        <div className='rating ms-3'>
                                            <StarIcon />
                                            {/* <StarRating value={products?.items?.user?.rating} /> */}
                                            <span>{products?.items?.user?.rating ?? "0.0"}</span>
                                        </div>
                                    </div>
                                    <div className='mt-3 mt-md-0 d-flex align-items-center justify-content-between w-xs-100'>
                                        <div className="d-flex">
                                            <div className="d-flex flex-column align-items-center">
                                                <p className='fs-09 mb-1 mb-sm-2'>Сделки</p>
                                                <p className="fs-15 title-font lh-n">{products?.items?.user?.order}</p>
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
                                                        messages={messages}
                                                        emptyText="Нет сообщений"
                                                        onSubmit={(e) => onNewMessage(e)}
                                                        onChange={(e) => setValue("text", e)}
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
                                defaultValue={`${process.env.REACT_APP_SITE_URL}/profile/${products.items.userId}`}
                            />
                        </Modal.Body>
                    </Modal>
                </Container>
            </section>
        </main>
    )
}

export default LotPage