import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import ServerSwitcher from '../components/utils/ServerSwitcher';
import GameСover from '../components/svg/GameСover';
import OfferLine from '../components/OfferLine';

const Game = () => {
  return (
    <main>
      <Container>
        <NavBreadcrumbs/>
      </Container>

      <section className='page-game pb-5'>
        <Container className='mb-5'>
          <h1 className='mb-4 mb-xxxl-5'>Lineage 2</h1>
          <Row>
            <Col lg={7}>
              <ServerSwitcher serversArr={[
                {id: 'server-1', title: 'RU/EU'},
                {id: 'server-2', title: 'FREE'},
              ]}/>

              <ul className='categories'>
                <li><button type='button' className='active'>Предметы</button></li>
                <li><button type='button'>Аккаунты</button></li>
                <li><button type='button'>Голда</button></li>
                <li><button type='button'>Прочее</button></li>
                <li><button type='button'>Арена</button></li>
                <li><button type='button'>Предметы</button></li>
                <li><button type='button'>Аккаунты</button></li>
                <li><button type='button'>Аккаунты</button></li>
                <li><button type='button'>Голда</button></li>
                <li><button type='button'>Прочее</button></li>
                <li><button type='button'>Арена</button></li>
                <li><button type='button'>Монеты</button></li>
              </ul>

              <form action="" className='filter mb-4 mb-xxxl-5'>
                <label className='fs-12 me-5 mb-3'>
                  <span className='me-2'>Только продавцы онлайн</span>
                  <input type="checkbox" />
                </label>
                <input type="search" className='mb-3' placeholder='Поиск по описанию'/>
                <select defaultValue={0} className='me-5 mb-3'>
                  <option disabled value="0">Экипировка</option>
                  <option value="1">Экипировка 1</option>
                  <option value="2">Экипировка 2</option>
                </select>
                <select defaultValue={0} className='me-5 mb-3'>
                  <option disabled value="0">Раса</option>
                  <option value="1">Раса 1</option>
                  <option value="2">Раса 2</option>
                </select>
                <div className='d-flex align-items-baseline me-5 mb-3'>
                  <span>Уровень</span>
                  <input type="number" placeholder='от' className='ms-2'/>
                  <input type="number" placeholder='до' className='ms-1'/>
                </div>
                <select defaultValue={0} className='me-5 mb-3'>
                  <option disabled value="0">Ранг</option>
                  <option value="1">Ранг 1</option>
                  <option value="2">Ранг 2</option>
                </select>
                <select defaultValue={0} className='mb-3'>
                  <option disabled value="0">Тип</option>
                  <option value="1">Тип 1</option>
                  <option value="2">Тип 2</option>
                </select>
              </form>
            </Col>
            <Col lg={5} className='d-flex flex-column justify-content-end'>
              <div className="img">
                <GameСover/>
                <div className="img-lots">
                  <div className='num'>856</div>
                  <div>лотов</div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="offers">
            <div className="top">
              <div className="serv">Сервер</div>
              <div className='descr'>Описание</div>
              <div className='seller'>Продавец</div>
              <div className='count'>Наличие, шт.</div>
              <div className='price'>Цена</div>
            </div>
            <ul className='row row-cols-1 g-3'>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'} seller={'Weatherwax'} sellerRating={4.8} sellerImg={"imgs/user.png"} count={1} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Повелитель Бури СХ 109 и 50%/ДУАЛ АРХИМАГ 105, 109 уровень, Тёмные эльфы, Одетый (подробности в описании)'} seller={'User8name'} sellerRating={4.1} sellerImg={"imgs/user.jpg"} count={2} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'} seller={'Weatherwax'} sellerRating={4.8} sellerImg={"imgs/user.png"} count={1} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Повелитель Бури СХ 109 и 50%/ДУАЛ АРХИМАГ 105, 109 уровень, Тёмные эльфы, Одетый (подробности в описании)'} seller={'User8name'} sellerRating={4.1} sellerImg={"imgs/user.jpg"} count={2} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'} seller={'Weatherwax'} sellerRating={4.8} sellerImg={"imgs/user.png"} count={1} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Повелитель Бури СХ 109 и 50%/ДУАЛ АРХИМАГ 105, 109 уровень, Тёмные эльфы, Одетый (подробности в описании)'} seller={'User8name'} sellerRating={4.1} sellerImg={"imgs/user.jpg"} count={2} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Тяж, Лайт, Маг Сэт Ада Пустые, Наборы (сеты), R'} seller={'Weatherwax'} sellerRating={4.8} sellerImg={"imgs/user.png"} count={1} price={186.97}/>
              </li>
              <li>
                <OfferLine serv={'Airin + Blackbird'} descr={'Повелитель Бури СХ 109 и 50%/ДУАЛ АРХИМАГ 105, 109 уровень, Тёмные эльфы, Одетый (подробности в описании)'} seller={'User8name'} sellerRating={4.1} sellerImg={"imgs/user.jpg"} count={2} price={186.97}/>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Game;