import React, { memo, useEffect, useState } from "react";
import ServerSwitcher from './utils/ServerSwitcher';
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from 'react-router-dom';
import { getImageURL } from "../helpers/all";
import GameCardElement from "./GameCardElement";

const GameCard = memo(({ param1, param2, onSearch, term }) => {
  const filteredGames = param1 ? param2[param1] : term ? param2.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (titleA.startsWith(term?.toUpperCase()) && !titleB.startsWith(term?.toUpperCase())) {
      return -1;
    }
    if (!titleA.startsWith(term?.toUpperCase()) && titleB.startsWith(term?.toUpperCase())) {
      return 1;
    }

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  }) : param2;
  return filteredGames.map((el) => (
    <GameCardElement el={el} onSearch={onSearch} />

  ));
});

export default GameCard;