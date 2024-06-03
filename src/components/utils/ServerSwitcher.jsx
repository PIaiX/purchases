import React, { useState, useRef, useEffect } from 'react';
import BeadIcon from '../../assets/imgs/bead.svg';
import { Link, useNavigate } from 'react-router-dom';

const ServerSwitcher = ({ serversArr, onChange, active, data }) => {
  const Servers = [...serversArr].sort((a, b) => a.priority - b.priority);
  const [server, setServer] = useState(active || Servers[0].id);
  const cut2 = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const servLi = document.getElementById(server);
    cut2.current.style.left = Math.round(servLi.offsetLeft + servLi.offsetWidth / 2) + 'px';
  }, [server]);
  useEffect(() => {
    if (!onChange) {
      setServer(active)
    }
  }, [active]);
  const generateLinkTo = (obj, id) => {
    const baseParams = `regId=${obj.id}`;
    const additionalParams = data.param ? `&catId=${data.param}` : '';
    return `/game/${data.uid ?? data.categoryId ?? id}/?${baseParams}${additionalParams}`;
  };

  return (
    <ul className="servers">
      <li ref={cut2} className="indicator">
        <img src={BeadIcon} alt="bead" />
      </li>
      {onChange ?
        Servers.map((obj, index) => {
          return <li key={index} id={obj.id} className={(server === obj.id) ? 'active' : ''} onClick={() => {
            setServer(obj.id);
            onChange(obj.id);
          }}>{obj.title}</li>
        })
        :
        Servers.map((obj, index) => {
          return <li key={index} id={obj.id} className={(server === obj.id) ? 'active' : ''} onClick={() => navigate(generateLinkTo(obj))}>
            {obj.title}
          </li>
        })
      }
    </ul>
  );
};

export default ServerSwitcher;