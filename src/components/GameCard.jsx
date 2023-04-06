import React, {useState, useRef} from 'react';

const GameCard = () => {
  const [server, setServer] = useState(1);
  const box = useRef();

  // const boxWidth = box.current.offsetWidth;
  // console.log('boxWidth='+boxWidth);

  return (
    <div className="game-card">
      <img src="imgs/archeage.jpg" alt="ArcheAge" />
      <div>
        <h4>ArcheAge</h4>
        <ul ref={box} className="servers">
          <li className={(server===1) ? 'active' : ''} onClick={()=>setServer(1)}>RU/EU</li>
          <li className={(server===2) ? 'active' : ''} onClick={()=>setServer(2)}>US</li>
          <li className={(server===3) ? 'active' : ''} onClick={()=>setServer(3)}>FREE</li>
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