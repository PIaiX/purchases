import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import ScrollSpy from "react-ui-scrollspy";
import Arrow from '../assets/imgs/arrow.svg';
import GameCard from './GameCard';
import SearchIcon from './svg/SearchIcon';
import Loader from './utils/Loader';

const CatalogSection = ({ games }) => {
  const [full, setFull] = useState(false);
  const cut = useRef(null);
  const onScroll = (id) => {
    const link = document.querySelector('[data-to-scrollspy-id="' + id + '"]');
    cut.current.style.top = link.offsetTop + 'px';
  }


  if (games.loading) {
    return <Loader />;
  }


  return (
    <section className='sec-catalog mb-6'>
      <Container><h2>Выбери одну из 104 игр</h2></Container>
      <Container>
        <div className="sec-catalog-box">
          <ScrollSpy
            activeClass="ss-active"
            scrollThrottle={100}
            useBoxMethod={true}
            updateHistoryStack={false}
            onUpdateCallback={(id) => onScroll(id)}
          >
            <div>
              {games.data && games.items && games.data.map((letter) => (
                <div id={`letter-${letter}`} className="sec-catalog-part">

                  <div className="letter">{letter}</div>
                  <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5">
                    <GameCard param1={letter} param2={games.items} />

                  </ul>

                </div>
              ))}
              <div className='sec-promo mb-5'>
                <div className='text'>
                  <h1 className='mb-0 mb-md-2'>Играй в свое <br className='d-sm-none' />удовольствие</h1>
                  <h3 className='d-none d-md-block'>Более 1000 лотов уже ждут тебя</h3>
                </div>
                <img src="/imgs/head.png" alt="head" />
                <button type='button' className='btn-2 d-none d-lg-block'>Перейти в каталог</button>
              </div>
            </div>
          </ScrollSpy>
        </div>

        <nav className='sec-catalog-nav'>
          <div
            onMouseEnter={() => setFull(true)}
            onMouseLeave={() => setFull(false)}
            className={(full) ? 'wrap full' : 'wrap'}
          >
            <form action="">
              <button type='submit'>
                <SearchIcon />
              </button>
              <input type="text" placeholder='Поиск' className='p-blue' />
            </form>
            <ul>
              {games.data && games.items && games.data.map((letter) => (
                <li><Link to={"/#letter-" + letter} data-to-scrollspy-id={"letter-" + letter}>{letter}</Link></li>
              ))}
            </ul>
            <div ref={cut} id="cut" className={(full) ? 'opened' : ''}><img src={Arrow} alt="arrow" /></div>
          </div>
        </nav>
      </Container>
    </section>
  );
};

export default CatalogSection;