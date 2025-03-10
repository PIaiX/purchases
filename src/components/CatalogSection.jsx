import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import GameCard from './GameCard';
import SearchIcon from './svg/SearchIcon';
import useIsMobile from '../hooks/isMobile';
import Arrow from './svg/Arrow';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Link } from 'react-scroll';
import { Col, Row } from 'react-bootstrap';
import MainSlider from './MainSlider';
import Logo from './svg/Logo';

const CatalogSection = ({ games }) => {
  const [full, setFull] = useState(false);
  const [panelWidth, setPanelWidth] = useState('auto');
  const cut = useRef(null);
  const panelRef = useRef(null);
  const [sortSwiper, setSortSwiper] = useState();
  const [currentSection, setCurrentSection] = useState();
  const offsetT = -100;

  useEffect(() => {
    if (full && panelRef.current) {
      // Получаем вычисленные стили элемента
      const styles = window.getComputedStyle(panelRef.current);

      // Получаем paddingLeft и paddingRight как числа
      const paddingLeft = parseFloat(styles.paddingLeft);
      const paddingRight = parseFloat(styles.paddingRight);

      // Вычисляем общую ширину: ширина содержимого + padding
      const width = panelRef.current.scrollWidth + paddingLeft + paddingRight;

      // Устанавливаем ширину
      setPanelWidth(`${width}px`);
    } else {
      // Возвращаем ширину к auto при сворачивании
      setPanelWidth('auto');
    }
  }, [full]);

  const updateSlider = (i) => {
    if (sortSwiper) {
      sortSwiper?.slideTo(i);
      setCurrentSection(i);
    }
  };

  const menuRef = useRef(null);

  useEffect(() => {
    function updateSort() {
      const menuNode = menuRef.current;
      if (menuNode) {
        const rect = menuNode.getBoundingClientRect();
        const offsetElem = rect.top + window.pageYOffset;
        const scrollTop = window.pageYOffset;
      }
    }
    window.addEventListener("scroll", updateSort);
    return () => window.removeEventListener("scroll", updateSort);
  }, []);

  return (
    <section className='sec-catalog mb-6'>
      <div className='sec-catalog-container'>
        <div className='home-slider mb-4 align-items-center'>
          <div className="title">
            <Logo />
            <h1>Играй с удовольствием <br className='d-none d-lg-inline' /> в любимые игры</h1>
            <h3>Откройте для себя мир захватывающих игр и наслаждайтесь каждым мгновением!</h3>
          </div>
          <div className='slider'>
            <MainSlider />
          </div>
        </div>
        <h2>Выбери одну из {games?.items?.length} игр</h2>
        <div className="sec-catalog-box">
          <nav className='sec-catalog-nav-mobile'>
            <div
              className={full ? 'wrap full' : 'wrap'}
              ref={panelRef}
              style={{ width: panelWidth }}
            >
              <div className='alfabet'>
                <ul>
                  {games?.data && games?.letters && games?.letters.map((letter, i) => {
                    return (
                      <li key={letter}>
                        <Link
                          activeClass="active"
                          to={"section-" + i}
                          spy={true}
                          smooth={true}
                          offset={offsetT}
                          duration={300}
                          onSetActive={() => updateSlider(i)}
                        >
                          {letter}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div id="sort" className='scroll'>
                <nav className="sort">
                  <Swiper
                    ref={menuRef}
                    direction={'vertical'}
                    loop={false}
                    spaceBetween={0}
                    slidesPerView={'auto'}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Mousewheel]}
                    initialSlide={currentSection}
                    freeMode={{
                      enabled: true,
                      sticky: true,
                    }}
                    mousewheel={true}
                    onSwiper={setSortSwiper}
                  >
                    {games?.letters && games?.letters?.map((letter, i) => {
                      return (
                        <SwiperSlide key={letter.id} >
                          <Link
                            activeClass="active"
                            to={"section-" + i}
                            spy={true}
                            smooth={true}
                            offset={offsetT}
                            duration={300}
                            onSetActive={() => updateSlider(i)}
                          >
                            {letter}
                          </Link>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </nav>
              </div>
              <div ref={cut} id="cut" onClick={() => setFull(!full)} className={full ? 'opened' : ''}>
                <Arrow className="img" />
              </div>
            </div>
          </nav>
          <div className="sec-catalog-box-mobile">
            <div>
              {games?.data && games?.letters && games.letters.map((letter, i) => (
                <section key={letter} id={`section-${i}`} className="sec-catalog-part">
                  <div className='element'>
                    <div className="letter">{letter}</div>
                    <ul className="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-4 gy-4 gy-sm-5">
                      <GameCard param1={letter} param2={games.data} />
                    </ul>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
      <nav className='sec-catalog-nav'>
        <div
          className={full ? 'wrap full' : 'wrap'}
          ref={panelRef}
          style={{ width: panelWidth }}
        >
          <div className='alfabet'>
            <ul>
              {games?.data && games?.letters && games?.letters.map((letter, i) => {
                return (
                  <li key={letter}>
                    <Link
                      activeClass="active"
                      to={"section-" + i}
                      spy={true}
                      smooth={true}
                      offset={offsetT}
                      duration={300}
                      onSetActive={() => updateSlider(i)}
                    >
                      {letter}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="sort" className='scroll'>
            <nav className="sort">
              <Swiper
                ref={menuRef}
                direction={'vertical'}
                loop={false}
                spaceBetween={0}
                slidesPerView={'auto'}
                watchSlidesProgress={true}
                modules={[FreeMode, Mousewheel]}
                initialSlide={currentSection}
                freeMode={{
                  enabled: true,
                  sticky: true,
                }}
                mousewheel={true}
                onSwiper={setSortSwiper}
              >
                {games?.letters && games?.letters?.map((letter, i) => {
                  return (
                    <SwiperSlide key={letter.id} >
                      <Link
                        activeClass="active"
                        to={"section-" + i}
                        spy={true}
                        smooth={true}
                        offset={offsetT}
                        duration={300}
                        onSetActive={() => updateSlider(i)}
                      >
                        {letter}
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </nav>
          </div>
          <div ref={cut} id="cut" onClick={() => setFull(!full)} className={full ? 'opened' : ''}>
            <Arrow className="img" />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default CatalogSection;