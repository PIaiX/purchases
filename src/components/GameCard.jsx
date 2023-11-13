import React, { memo, useEffect, useState } from "react";
import ServerSwitcher from './utils/ServerSwitcher';
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from 'react-router-dom';

const GameCard = memo(({ param1, param2 }) => {
  let data, catId;
  const filteredGames = param2.filter(game => game.title.toUpperCase().startsWith(param1));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [regId, setRegId] = useState(1);
  const handleServerChange = (regionId) => {
    setRegId(regionId);
  };
  return filteredGames.map(el => (
    <div className="game-card">
      <Link to='/game'><img src="/imgs/archeage.jpg" alt="ArcheAge" className='img' /></Link>
      <div>
        <h4><Link to={`/game/?data=${data = el.title}&regId=${regId}`}>{el.title}</Link></h4>

        {el.regions && el.regions.length > 0 && (
          <ServerSwitcher serversArr={el.regions} onChange={handleServerChange} />
        )}

        <ul className='categories'>
          {el.params.map((param) => (
            <li key={param.id}><Link to={`/game/?data=${data}&regId=${regId}&catId=${param.id}`}>{param.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  ));
});

export default GameCard;