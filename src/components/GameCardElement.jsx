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

const GameCardElement = memo(({ el, onSearch }) => {
  const [regId, setRegId] = useState({
    current: el?.regions ? [...el.regions].sort((a, b) => a.priority - b.priority)[0]?.id : null,
    items: el?.regions ? [...el.regions].sort((a, b) => a.priority - b.priority) : null
  });
  const [catId, setCatId] = useState({
    first: null,
    items: [],
  })
  useEffect(() => {
    if (regId) {
      const params = [...el?.params].filter(e => e.data?.region ? e.data.region == 'all' || e.data.region.includes(String(regId.current)) : true)?.sort((a, b) => a.priority - b.priority)
      console.log(params)
      setCatId({ items: params, first: params[0]?.id })
    }
    if (!el.regions) {
      setCatId({ items: [...el?.params]?.sort((a, b) => a.priority - b.priority), first: [...el?.params]?.sort((a, b) => a.priority - b.priority)[0].id })
    }
  }, [regId]);


  return (
    <div className="game-card">
      < div >
        <h4 onClick={onSearch}><Link to={`/game/${el.uid ? el.uid : el.id}/?${regId?.current ? `regId=${regId?.current}&` : ''}${el?.params?.length > 0 ? `catId=${catId.first}` : ''}`}>
          {el.title}
        </Link></h4>

        {
          el.regions && el.regions.length > 0 && regId.items[0].status ? (
            <ServerSwitcher serversArr={regId.items} onChange={(e) => setRegId({ ...regId, current: e })} />
          )
            :
            ""
        }

        <ul onClick={onSearch} className='categories'>
          {catId.items.map((param) => (
            <li key={param.id}><Link to={`/game/${el.uid ? el.uid : el.id}/?${regId?.current ? `regId=${regId?.current}&` : ''}${param.id ? `catId=${param.id}` : ''}`}>{param.title}</Link></li>
          ))}
        </ul>
      </div >
    </div >
  )

});

export default GameCardElement;