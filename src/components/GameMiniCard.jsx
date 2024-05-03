import React, { useState } from 'react';
import { getImageURL } from '../helpers/all';

const GameMiniCard = ({ id, media, title, onGameChange }) => {
  const [isActive, setIsActive] = useState(false);
  const handleGameChange = () => {
    onGameChange(id);
    setIsActive(true);
  };
  return (
    <button className={`game-card-mini ${isActive ? 'bg-gray' : ''}`} onClick={handleGameChange}>
      <h6>{title}</h6>
    </button>
  );
};

export default GameMiniCard;