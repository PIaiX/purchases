import React from 'react';
import { Link } from 'react-router-dom';
import GameDate from './GameDate';

const SortDate = () => {
  const gameItems = GameDate;
  const uniqueLetters = new Set();

  gameItems.forEach(word => {
    const firstLetter = word.title.charAt(0).toUpperCase();

    if (!uniqueLetters.has(firstLetter)) {
      uniqueLetters.add(firstLetter);
    }
  });

  const alphabet = Array.from(uniqueLetters).sort();

  return alphabet;
};

export default SortDate;