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

const GameCard = memo(({ param1, param2, onSearch, term }) => {

  const filteredGames = param1 ? param2.filter(game => game.title.toUpperCase().startsWith(param1)) : param2;

  const [regId, setRegId] = useState([]);
  return filteredGames.sort((a, b) => {
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
  }).map((el, i) => (
    <div key={i} className="game-card">
      <div>
        <h4 onClick={onSearch}><Link to={`/game/${el.id}/?${regId[i] ? `regId=${regId[i]}&` : (el?.regions?.length > 0 ? `regId=${[...el.regions].sort((a, b) => a.priority - b.priority)[0].id}&` : '')}${el?.params?.length > 0 ? `catId=${[...el?.params]?.sort((a, b) => a.priority - b.priority)[0].id}` : ''}`}>
          {el.title}
        </Link></h4>

        {el.regions && el.regions.length > 0 && el.regions[0].status == 1 && (
          <ServerSwitcher serversArr={el.regions} onChange={(e) => setRegId(prevState => ({ ...prevState, [i]: e }))} />
        )}

        <ul onClick={onSearch} className='categories'>
          {[...el.params].sort((a, b) => a.priority - b.priority).map((param) => (
            <li key={param.id}><Link to={`/game/${el.id}/?${regId[i] ? `regId=${regId[i]}&` : (el.regions.length > 0 ? `regId=${[...el.regions].sort((a, b) => a.priority - b.priority)[0].id}&` : '')}${param.id ? `catId=${param.id}` : ''}`}>{param.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  ));
});

export default GameCard;