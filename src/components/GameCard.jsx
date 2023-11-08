import React from 'react';
import { Link } from 'react-router-dom';
import ServerSwitcher from './utils/ServerSwitcher';
import GameDate from './GameDate';



const GameCard = ({ prop }) => {
  const gameItems = GameDate;
  const filteredGames = gameItems.filter(game => game.title.toUpperCase().startsWith(prop));
  return filteredGames.map(el => (
    <div className="game-card">
      <Link to='/game'><img src="/imgs/archeage.jpg" alt="ArcheAge" className='img' /></Link>
      <div>
        <h4><Link to='/game'>{el.title}</Link></h4>
        <ServerSwitcher serversArr={el.server}
        />
        <ul className='categories'>
          {el.params.map((param) => (
            <li key={param.id}>{param.title}</li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default GameCard;