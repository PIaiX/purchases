import React, { memo, useEffect, useState } from "react";
import ServerSwitcher from './utils/ServerSwitcher';
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const GameCard = memo(({ param1, param2 }) => {
  let data, catId;
  const filteredGames = param2.filter(game => game.title.toUpperCase().startsWith(param1));
  return filteredGames.map(el => (
    <div className="game-card">
      <Link to='/game'><img src="/imgs/archeage.jpg" alt="ArcheAge" className='img' /></Link>
      <div>
        <h4><Link to={`/game/?data=${data = el.title}`}>{el.title}</Link></h4>

        {/* <ServerSwitcher serversArr={el.regions} /> */}

        <ul className='categories'>
          {el.params.map((param) => (
            <li key={param.id}><Link to={`/game/?data=${data}&catId=${param.title}`}>{param.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  ));
});

export default GameCard;