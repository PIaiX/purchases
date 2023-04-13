import React from 'react';
import {Link} from 'react-router-dom';
import ServerSwitcher from './utils/ServerSwitcher';

const GameCard = () => {
  return (
    <div className="game-card">
      <Link to='/game'><img src="imgs/archeage.jpg" alt="ArcheAge" className='img'/></Link>
      <div>
        <h4><Link to='/game'>ArcheAge</Link></h4>
        <ServerSwitcher serversArr={[
            {id: 'server-1', title: 'RU/EU'},
            {id: 'server-2', title: 'US'},
            {id: 'server-3', title: 'FREE'},
          ]}
        />
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