import React, {useState, useRef, useEffect} from 'react';
import BeadIcon from '../assets/imgs/bead.svg';

const GameCard = () => {
  const [server, setServer] = useState(1);
  const cut2 = useRef();

  useEffect(() => {
    const servLi = document.getElementById('server-' + server);
    cut2.current.style.left = Math.round(servLi.offsetLeft + servLi.offsetWidth/2)+'px';
  });

  return (
    <div className="game-card">
      <img src="imgs/archeage.jpg" alt="ArcheAge" className='img'/>
      <div>
        <h4>ArcheAge</h4>
        <ul className="servers">
          <li ref={cut2} className="indicator">
            <img src={BeadIcon} alt="bead" />
          </li>
          <li id="server-1" className={(server===1) ? 'active' : ''} onClick={()=>setServer(1)}>RU/EU</li>
          <li id="server-2" className={(server===2) ? 'active' : ''} onClick={()=>setServer(2)}>US</li>
          <li id="server-3" className={(server===3) ? 'active' : ''} onClick={()=>setServer(3)}>FREE</li>
        </ul>
        <ul className='categories'>
          <li>Золото</li>
          <li>Аккаунты</li>
          <li>Услуги</li>
          <li>Предметы</li>
          <li>Прочее</li>
        </ul>
      </div>
    </div>
  );
};

export default GameCard;