import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBreadcrumbs from '../components/NavBreadcrumbs';
import ServerSwitcher from '../components/utils/ServerSwitcher';
import GameСover from '../components/svg/GameСover';

const Game = () => {
  return (
    <main>
      <Container>
        <NavBreadcrumbs/>

        <section className='page-game'>
          <h1>Lineage 2</h1>
          <Row>
            <Col lg={7}>
              <ServerSwitcher serversArr={[
                {id: 'server-1', title: 'RU/EU'},
                {id: 'server-2', title: 'FREE'},
              ]}/>

              <ul className='categories'>
                <li><button type='button'>Предметы</button></li>
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

              <form action="" className='filter'>
                <label className='fs-12 me-5 mb-3'>
                  <span className='me-2'>Только продавцы онлайн</span>
                  <input type="checkbox" />
                </label>
                <input type="search" placeholder='Поиск по описанию' className='mb-3'/>
                <div className='d-flex align-items-baseline'>
                  <span>Уровень</span>
                  <input type="number" placeholder='от' className='ms-2'/>
                  <input type="number" placeholder='до' className='ms-1'/>
                </div>
              </form>
            </Col>
            <Col lg={5}>
              <GameСover/>
            </Col>
          </Row>
          <div className="offers">
            <div className="top">
              <div>Сервер</div>
              <div>Описание</div>
              <div>Продавец</div>
              <div>Наличие, шт.</div>
              <div>Цена</div>
            </div>
            <ul>
              <li>
                <div className='offer'>offer</div>
              </li>
              <li>
                <div>offer</div>
              </li>
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Game;