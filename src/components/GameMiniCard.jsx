import React, { useState } from 'react';
import { getImageURL } from '../helpers/all';

const GameMiniCard = ({ id, media, title, onGameChange, currentGame }) => {
  const handleGameChange = () => {
    onGameChange(id);
  };
  return (
    <button className={`game-card-mini ${currentGame == id ? 'active' : ''}`} onClick={handleGameChange}>
      <h6>{title}</h6>
    </button>
  );
};

export default GameMiniCard;