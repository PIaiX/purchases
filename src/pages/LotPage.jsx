import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import { PiCaretLeftLight, PiWarningLight } from "react-icons/pi";
import ReviewCard from '../components/ReviewCard';
import StarIcon from '../components/svg/StarIcon';
import { FiMessageCircle, FiEdit, FiShare, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
import LabeledInput from '../components/utils/LabeledInput';

const LotPage = () => {
  return (
    <main>
        <section className='lot-page mb-6'>
            <Container>
                <Link to="/game" className='blue d-flex align-items-center mb-3'>
                    <PiCaretLeftLight className='fs-15'/>
                    <span className='ms-2'>Назад в каталог</span>
                </Link>

                <Row>
                    <Col md={8}>
                        <div className="lot-page-box lot-page-grid mb-4">
                            <div className="game">
                                <img src="imgs/img5.jpg" alt="AFK Arena" />
                                <h6>AFK Arena</h6>
                            </div>

                            <div className='info'>
                                <span className='tag-gray me-3'>Аккаунты</span>
                                <span className='tag-green me-3'>RU/EU</span>
                                <div className='d-flex align-items-center'>
                                    <span>Сервер</span>
                                    <span className='fs-09 pale-blue mx-2'>●</span>
                                    <span>Airin + Blackbird</span>
                                </div>
                            </div>

                            <p className='title'>Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R</p>

                            <div className='date'>
                                <time>14:51</time>
                                <time className='ms-3'>16/03/2023</time>
                                <button type='button' className='d-flex fs-14 ms-3'>
                                    <PiWarningLight/>
                                </button>
                            </div>

                            <div className="payment">
                                <LabeledInput 
                                    className={"min-250 me-4"}
                                    type={"select"} 
                                    label={"Выберите способ оплаты"} 
                                    options={[{value:1, text: 'Банковская карта'}, {value:2, text: 'СБП'}, {value:3, text: 'MIR PAY'}]}
                                />
                                <button type='button' className='btn-1'>Оплатить 186,97 ₽</button>
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

                            {/* <div className="p-3">
                                <div className='d-flex justify-content-between align-items-start'>
                                    <div className="d-flex align-items-end">
                                        
                                        <div>
                                            
                                            
                                        </div>
                                    </div>
                                    
                                    <div className='light-gray d-flex align-items-center'>
                                        <time>14:51</time>
                                        <time className='ms-3'>16/03/2023</time>
                                        <button type='button' className='d-flex fs-14 ms-3'>
                                            <PiWarningLight/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 d-flex">
                                    <LabeledInput 
                                        className={"min-250 me-4"}
                                        type={"select"} 
                                        label={"Выберите способ оплаты"} 
                                        options={[{value:1, text: 'Банковская карта'}, {value:2, text: 'СБП'}, {value:3, text: 'MIR PAY'}]}
                                    />
                                    <button type='button' className='btn-1'>Оплатить 186,97 ₽</button>
                                </div>
                            </div>
                            <hr />
                            <div className="p-3">
                                <div className="row row-cols-2">
                                    <div className='fs-09'>
                                        <p>Какое то продающее описание товара </p>
                                    </div>
                                    <div>
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
                                </div>
                            </div> */}
                        </div>

                        <div className="lot-page-box mb-4">
                            <div className="p-3">
                                <div className='d-flex justify-content-between align-items-start'>
                                    <div className="d-flex align-items-end">
                                        <div className="game me-3">
                                            <img src="imgs/img5.jpg" alt="AFK Arena" />
                                            <h6>AFK Arena</h6>
                                        </div>
                                        <div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <span className='tag-gray me-3'>Аккаунты</span>
                                                <span className='tag-green me-3'>RU/EU</span>
                                                <div className='d-flex align-items-center'>
                                                    <span>Сервер</span>
                                                    <span className='fs-09 pale-blue mx-2'>●</span>
                                                    <span>Airin + Blackbird</span>
                                                </div>
                                            </div>
                                            <p className='blue'>Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R</p>
                                        </div>
                                    </div>
                                    
                                    <div className='light-gray d-flex align-items-center'>
                                        <time>14:51</time>
                                        <time className='ms-3'>16/03/2023</time>
                                        <button type='button' className='d-flex fs-14 ms-3'>
                                            <PiWarningLight/>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 d-flex">
                                    <LabeledInput 
                                        className={"min-250 me-4"}
                                        type={"select"} 
                                        label={"Выберите способ оплаты"} 
                                        options={[{value:1, text: 'Банковская карта'}, {value:2, text: 'СБП'}, {value:3, text: 'MIR PAY'}]}
                                    />
                                    <button type='button' className='btn-1'>Оплатить 186,97 ₽</button>
                                </div>
                            </div>
                            <hr />
                            <div className="p-3">
                                <div className="row row-cols-2">
                                    <div className='fs-09'>
                                        <p>Какое то продающее описание товара </p>
                                    </div>
                                    <div>
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
                                </div>
                            </div>
                        </div>

                        <div className="lot-page-box">
                            <div className="px-3 py-2 d-flex justify-content-between align-items-center">
                                <div className="seller">
                                    <img src="imgs/user.jpg" alt="Weatherwax" />
                                    <h3 className='title-font lh-n mb-0'>Weatherwax</h3>
                                    <div className='rating ms-3'>
                                        <StarIcon/>
                                        <span>4,5</span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <p className='fs-09 mb-2'>Сделки</p>
                                        <p className="fs-15 title-font lh-n">200</p>
                                    </div>
                                    <div className='ms-4'>
                                        <p className='fs-09 mb-2'>Лоты</p>
                                        <p className="fs-15 title-font lh-n">2266</p>
                                    </div>
                                    <div className='ms-5'>
                                        <button type='button' className='d-flex gray fs-13 mb-3'><FiShare/></button>
                                        <button type='button' className='d-flex gray fs-13'><FiAlertTriangle/></button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="px-3 py-2">
                                <p className='blue'>Напишите продавцу перед покупкой</p>
                            </div>
                            <hr />
                            <div className="p-3"></div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h2 className='fs-15'>Отзывы</h2>
                        <ul className='list-unstyled'>
                            <li className='mb-3'>
                                <ReviewCard/>
                            </li>
                            <li className='mb-3'>
                                <ReviewCard/>
                            </li>
                            <li className='mb-3'>
                                <ReviewCard/>
                            </li>
                            <li className='mb-3'>
                                <ReviewCard/>
                            </li>
                            <li className='mb-3'>
                                <ReviewCard/>
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