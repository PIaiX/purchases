import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';
import LabeledInput from '../../components/utils/LabeledInput';

const AddOffer = () => {
  return (
    <section className='mb-3 mb-sm-5'>
      <div className='row'>
        <div className='col-12 col-xxl-11 col-xxxl-10'>
          <div className="d-flex align-items-center mb-4 mb-lg-5">
            <Link to='/account/offers' className='d-lg-none d-flex fs-20 blue me-4'>
              <ReturnIcon/>
            </Link>
            <h1 className='h2 mb-0'>Новое объявление</h1>
          </div>

          <form action="" className='add-offer'>
            <Row>
              <Col xs={12} xl={10} xxl={9}>
                <Row className='g-4 g-xl-5'>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Игра"} 
                      options={[{value:1, text: 'World of Warcraft'}, {value:2, text: 'World of Warcraft'}, {value:3, text: 'World of Warcraft'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Платформа"} 
                      options={[{value:1, text: 'Платформа 1'}, {value:2, text: 'Платформа 2'}, {value:3, text: 'Платформа 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Сервер"} 
                      options={[{value:1, text: 'Сервер 1'}, {value:2, text: 'Сервер 2'}, {value:3, text: 'Сервер 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Что вы продаете?"} 
                      options={[{value:1, text: 'Продукт 1'}, {value:2, text: 'Продукт 2'}, {value:3, text: 'Продукт 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Уровень"} 
                      options={[{value:1, text: 'Уровень 1'}, {value:2, text: 'Уровень 2'}, {value:3, text: 'Уровень 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Раса"} 
                      options={[{value:1, text: 'Раса 1'}, {value:2, text: 'Раса 2'}, {value:3, text: 'Раса 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Экипировка"} 
                      options={[{value:1, text: 'Экипировка 1'}, {value:2, text: 'Экипировка 2'}, {value:3, text: 'Экипировка 3'}]}
                    />
                  </Col>
                  <Col md={6}>
                    <LabeledInput 
                      type={"select"} 
                      label={"Профессия"} 
                      options={[{value:1, text: 'Профессия 1'}, {value:2, text: 'Профессия 2'}, {value:3, text: 'Профессия 3'}]}
                    />
                  </Col>
                  <Col md={12}>
                    <LabeledInput 
                      type={"text"} 
                      label={"Краткое описание"} 
                    />
                  </Col>
                  <Col md={12}>
                    <LabeledInput 
                      type={"text"} 
                      label={"Подробное описание"} 
                    />
                  </Col>
                  <Col md={4}>
                    <LabeledInput 
                      type={"text"} 
                      label={"Наличие"} 
                    />
                  </Col>
                  <Col md={4}>
                    <LabeledInput 
                      type={"text"} 
                      label={"Цена, ₽ "} 
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <button type='button' className='btn-1 mt-4 mt-sm-5'>Опубликовать</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddOffer;