import React from 'react';
import {Link} from 'react-router-dom';

const GameMiniCard = () => {
  return (
    <Link to='/game' className="game-card-mini">
      <img src="/imgs/archeage.jpg" alt="ArcheAge" className='img'/>
      <h6>ArcheAge</h6>
    </Link>
  );
};

export default GameMiniCard;