import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FiAlertTriangle, FiShare } from "react-icons/fi";
import { PiCaretLeftLight, PiWarningLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import Chat from '../components/chat/Chat';
import Input from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import StarRating from '../components/utils/StarRating';
import { getProduct } from '../services/product';
import Meta from '../components/Meta';

const LotPage = () => {
    const userId = useSelector(state => state.auth?.user?.id);
    const { lotId } = useParams()
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
            })
            .catch(() => setProducts((prev) => ({ ...prev, loading: false })));
    }, [lotId]);
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
                                    <img src="/imgs/img5.jpg" alt="AFK Arena" />
                                    <h6 className='mt-2'>AFK Arena</h6>
                                </div>

                                <div className='info'>
                                    <div className='d-flex align-items-center'>
                                        <span className='tag-gray me-3'>Аккаунты</span>
                                        <span className='tag-green me-3'>RU/EU</span>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <span>Сервер</span>
                                        <span className='fs-09 pale-blue mx-2'>●</span>
                                        <span>{products?.items?.title}</span>
                                    </div>
                                </div>

                                <div className='title'>{products?.items?.desc} </div>

                                <div className='date'>
                                    <time>14:51</time>
                                    <time className='ms-3'>16/03/2023</time>
                                    <button type='button' className='d-flex fs-14 ms-3'>
                                        <PiWarningLight />
                                    </button>
                                </div>

                                <div className="payment">
                                    <Input
                                        className={"min-250 me-md-4"}
                                        type={"select"}
                                        label={"Выберите способ оплаты"}
                                        options={[{ value: 1, text: 'Банковская карта' }, { value: 2, text: 'СБП' }, { value: 3, text: 'MIR PAY' }]}
                                    />
                                    <button type='button' className='btn-1'>Оплатить {products?.items?.price} ₽</button>
                                </div>

                                <div className='text fs-09'>
                                    <p>Какое то продающее описание товара </p>
                                </div>

                                <ul className='specifications'>
                                    <li>
                                        <span>Хакатеристика</span>
                                        <span>Значение</span>
                                    </li>
                                    <li>
                                        <span>Хакатеристика</span>
                                        <span>Очень длинное значение</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="lot-page-box">
                                <Link to={`/profile/${products?.items?.userId}`} className="px-3 py-2 d-sm-flex justify-content-between align-items-center">
                                    <div className="seller w-xs-100">
                                        <img src="/imgs/user.jpg" alt="Weatherwax" />
                                        <h3 className='title-font lh-n mb-0'>{products?.items?.seller}</h3>
                                        <div className='rating ms-3'>
                                            <StarRating value={products?.items?.ratings ?? 0} />
                                            <span>{products?.items?.ratings}</span>
                                        </div>
                                    </div>
                                    <div className='mt-3 mt-md-0 d-flex align-items-center justify-content-between w-xs-100'>
                                        <div className="d-flex">
                                            <div>
                                                <p className='fs-09 mb-1 mb-sm-2'>Сделки</p>
                                                <p className="fs-15 title-font lh-n">200</p>
                                            </div>
                                            <div className='ms-4'>
                                                <p className='fs-09 mb-1 mb-sm-2'>Лоты</p>
                                                <p className="fs-15 title-font lh-n">2266</p>
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
                                            <button type='button' className='d-flex gray fs-13'><FiAlertTriangle /></button>
                                        </div>
                                    </div>
                                </Link>
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
                                            <Chat toId={products?.items?.userId} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs={12} lg={4} className='mt-5 mt-lg-0'>
                            <h2 className='fs-15'>Отзывы</h2>
                            <ul className='list-unstyled'>
                                {products?.reviews?.length > 0 && products.reviews.map(review => (
                                    <li className='mb-3'>
                                        <ReviewCard {...review} />
                                    </li>
                                ))}
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