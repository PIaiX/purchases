import React from 'react';

const GameCard = () => {
  return (
    <div className="game-card">
      <img src="imgs/archeage.jpg" alt="ArcheAge" />
      <div>
        <h4>ArcheAge</h4>
        <ul className="servers">
          <li>RU/EU</li>
          <li>US</li>
          <li>FREE</li>
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