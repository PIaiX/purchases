import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import SearchIcon from './svg/SearchIcon';
import Arrow from '../assets/imgs/arrow.svg';
import GameCard from './GameCard';
import ScrollSpy from "react-ui-scrollspy";

const CatalogSection = () => {
  const [full, setFull] = useState(false);
  const cut = useRef(null);

  const onScroll = (id) => {
    const link = document.querySelector('[data-to-scrollspy-id="'+ id +'"]');
    cut.current.style.top = link.offsetTop+'px';
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
            <div id="letter-A" className='sec-catalog-part'>
              <div className="letter">A</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>

            <div id="letter-B" className='sec-catalog-part'>
              <div className="letter">B</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>

            <div className='sec-promo mb-5'>
              <div className='text'>
                <h1 className='mb-0 mb-md-2'>Играй в свое <br className='d-sm-none'/>удовольствие</h1>
                <h3 className='d-none d-md-block'>Более 1000 лотов уже ждут тебя</h3>
              </div>
              <img src="imgs/head.png" alt="head" />
              <button type='button' className='btn-2 d-none d-lg-block'>Перейти в каталог</button>
            </div>

            <div id="letter-C" className='sec-catalog-part'>
              <div className="letter">C</div>
              <ul className='list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5'>
                <li>
                  <GameCard />
                </li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
                <li><GameCard /></li>
              </ul>
            </div>
          </ScrollSpy>
        </div>

        <nav className='sec-catalog-nav'>
          <div 
            onMouseEnter={()=>setFull(true)} 
            onMouseLeave={()=>setFull(false)}
            className={(full) ? 'wrap full' : 'wrap'}
          >
            <form action="">
              <button type='submit'>
                <SearchIcon />
              </button>
              <input type="text" placeholder='Поиск' className='p-blue'/>
            </form>
            <ul>
              <li><Link to="/#letter-A" data-to-scrollspy-id="letter-A">A</Link></li>
              <li><Link to="/#letter-B" data-to-scrollspy-id="letter-B">B</Link></li>
              <li><Link to="/#letter-C" data-to-scrollspy-id="letter-C">C</Link></li>
              <li><Link to="/#letter-D" data-to-scrollspy-id="letter-D">D</Link></li>
              <li><Link to="/#letter-E" data-to-scrollspy-id="letter-E">E</Link></li>
              <li><Link to="/#letter-F" data-to-scrollspy-id="letter-F">F</Link></li>
              <li><Link to="/#letter-G" data-to-scrollspy-id="letter-G">G</Link></li>
              <li><Link to="/#letter-G" data-to-scrollspy-id="letter-G">H</Link></li>
              <li><Link to="/#letter-I" data-to-scrollspy-id="letter-I">I</Link></li>
              <li><Link to="/#letter-J" data-to-scrollspy-id="letter-J">J</Link></li>
              <li><Link to="/#letter-K" data-to-scrollspy-id="letter-K">K</Link></li>
              <li><Link to="/#letter-L" data-to-scrollspy-id="letter-L">L</Link></li>
              <li><Link to="/#letter-M" data-to-scrollspy-id="letter-M">M</Link></li>
              <li><Link to="/#letter-N" data-to-scrollspy-id="letter-N">N</Link></li>
              <li><Link to="/#letter-O" data-to-scrollspy-id="letter-O">O</Link></li>
              <li><Link to="/#letter-P" data-to-scrollspy-id="letter-P">P</Link></li>
              <li><Link to="/#letter-Q" data-to-scrollspy-id="letter-Q">Q</Link></li>
              <li><Link to="/#letter-R" data-to-scrollspy-id="letter-R">R</Link></li>
              <li><Link to="/#letter-S" data-to-scrollspy-id="letter-S">S</Link></li>
              <li><Link to="/#letter-T" data-to-scrollspy-id="letter-T">T</Link></li>
              <li><Link to="/#letter-U" data-to-scrollspy-id="letter-U">U</Link></li>
              <li><Link to="/#letter-V" data-to-scrollspy-id="letter-V">V</Link></li>
              <li><Link to="/#letter-W" data-to-scrollspy-id="letter-W">W</Link></li>
              <li><Link to="/#letter-X" data-to-scrollspy-id="letter-X">X</Link></li>
              <li><Link to="/#letter-Y" data-to-scrollspy-id="letter-Y">Y</Link></li>
              <li><Link to="/#letter-Z" data-to-scrollspy-id="letter-Z">Z</Link></li>
              <li><Link to="/#letter-ru" data-to-scrollspy-id="letter-ru">А-Я</Link></li>
            </ul>
            <div ref={cut} id="cut" className={(full)?'opened':''}><img src={Arrow} alt="arrow" /></div>
          </div>
        </nav>
      </Container>
    </section>
  );
};

export default CatalogSection;