import React, { useState, useRef, useEffect } from 'react';
import BeadIcon from '../../assets/imgs/bead.svg';

const ServerSwitcher = ({ serversArr, onChange, active }) => {
  const Servers = serversArr;
  const [server, setServer] = useState(active || Servers[0].id);
  const cut2 = useRef();

  // useEffect(() => {
  //   const servLi = document.getElementById(server);
  //   cut2.current.style.left = Math.round(servLi.offsetLeft + servLi.offsetWidth / 2) + 'px';
  // });

  return (
    <ul className="servers">
      <li ref={cut2} className="indicator">
        <img src={BeadIcon} alt="bead" />
      </li>
      {
        Servers.map((obj, index) => {
          return <li key={index} id={obj.id} className={(server === obj.id) ? 'active' : ''} onClick={() => {
            setServer(obj.id);
            onChange(obj.id);
          }}>{obj.title}</li>
        })
      }
    </ul>
  );
};

export default ServerSwitcher;