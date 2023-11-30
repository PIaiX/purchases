import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import { PiCaretLeftLight, PiWarningLight } from "react-icons/pi";
import ReviewCard from '../components/ReviewCard';
import StarIcon from '../components/svg/StarIcon';
import { FiMessageCircle, FiEdit, FiShare, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
import Input from '../components/utils/Input';
import Chat from '../components/chat/Chat';
import { useLocation, useNavigate } from 'react-router-dom';
import TableDate from '../components/TableDate';
import { getProduct } from '../services/product';
import { useSelector } from "react-redux";

const LotPage = () => {
    const userId = useSelector(state => state.auth?.user?.id);
    const { lotId } = useParams()
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
                    items: res,
                }))
            })
            .catch(() => setProducts((prev) => ({ ...prev, loading: false })));
    }, [lotId]);
    return (
        <main>
            <section className='lot-page mb-6'>
                <Container>
                    <Link to="/game" className='blue d-flex align-items-center mb-3'>
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
                                <div className="px-3 py-2 d-sm-flex justify-content-between align-items-center">
                                    <div className="seller w-xs-100">
                                        <img src="/imgs/user.jpg" alt="Weatherwax" />
                                        <h3 className='title-font lh-n mb-0'>{products?.items?.seller}</h3>
                                        <div className='rating ms-3'>
                                            <StarIcon />
                                            <span>{products?.items?.sellerRating}</span>
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
                                            <button type='button' className='d-flex gray fs-13 mb-2 mb-sm-3'><FiShare /></button>
                                            <button type='button' className='d-flex gray fs-13'><FiAlertTriangle /></button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="px-3 py-2">
                                    <p className='blue'>Напишите продавцу перед покупкой</p>
                                </div>
                                <hr />
                                <div className="p-0">
                                    {products.loading ? (
                                        <div className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
                                            Загрузка сообщений...
                                        </div>
                                    ) : (
                                        <Chat toId={products?.items?.userId} />
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={4} className='mt-5 mt-lg-0'>
                            <h2 className='fs-15'>Отзывы</h2>
                            <ul className='list-unstyled'>
                                <li className='mb-3'>
                                    <ReviewCard />
                                </li>
                                <li className='mb-3'>
                                    <ReviewCard />
                                </li>
                                <li className='mb-3'>
                                    <ReviewCard />
                                </li>
                                <li className='mb-3'>
                                    <ReviewCard />
                                </li>
                                <li className='mb-3'>
                                    <ReviewCard />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default LotPage