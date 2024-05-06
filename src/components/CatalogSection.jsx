import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';
import Arrow from '../assets/imgs/arrow.svg';
import GameCard from './GameCard';
import SearchIcon from './svg/SearchIcon';
import useIsMobile from '../hooks/isMobile';

const CatalogSection = ({ games }) => {
  const [full, setFull] = useState(false);
  const cut = useRef(null);
  const isMobileLG = useIsMobile('991px');
  useEffect(() => {
    Events.scrollEvent.register('begin', function (to, element) {
      // Действия при начале прокрутки
    });

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  const onScroll = (id) => {
    scroll.scrollTo(id, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }


  return (
    <section className='sec-catalog mb-6 ms-6'>
      <Container><h2>Выбери одну из {games?.items?.length} игр</h2></Container>
      <Container>
        <div className="sec-catalog-box">

          <div>
            {games?.data && games?.letters && games.letters.map((letter) => (
              <Element key={letter} name={`section-${letter}`} className="sec-catalog-part">

                <div className="letter">{letter}</div>
                <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5">
                  <GameCard param1={letter} param2={games.data} />

                </ul>

              </Element>
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
        </div>

        <nav className='sec-catalog-nav'>
          <div
            onMouseEnter={() => setFull(true)}
            onMouseLeave={() => setFull(false)}
            className={(full) ? 'wrap full' : 'wrap'}
          >
            {/* <form action="">
              <button type='submit'>
                <SearchIcon />
              </button>
              <input type="text" placeholder='Поиск' className='p-blue' />
            </form> */}
            <ul>
              {games?.data && games?.letters && games?.letters.map((letter) => (
                <li key={letter}><Link to={`section-${letter}`} smooth={true} duration={300} offset={isMobileLG ? 0 : -100}>{letter}</Link></li>
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