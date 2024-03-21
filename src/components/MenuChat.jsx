import React, { useRef, useState } from 'react';
import { LuMails } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Arrow from '../assets/imgs/2arrow.svg';
import { getImageURL } from '../helpers/all';
import useIsMobile from '../hooks/isMobile';

const MenuChat = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const cut = useRef(null);
  const [full, setFull] = useState(false);
  return (
    <nav className='menu-chat'>
      <ul className='menu-nav-block'>
        <li>
          <NavLink to={`/account/messages/${user?.id}`} className="dialog-preview">
            <img
              src={getImageURL({
                path: user?.media,
                size: "mini",
                type: "user",
              })
              }
              alt="userphoto"
            />
            <div className="indicator green"></div>

          </NavLink>
        </li>
        <li >
          <hr />
          <NavLink to="account/messages">
            <LuMails className="svg" />
          </NavLink>
        </li>
      </ul>
      <div><img src={Arrow} alt="arrow" /></div>
    </nav >
  );
};

export default MenuChat;