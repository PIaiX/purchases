import React, { useEffect, useRef, useState } from 'react';
import { LuMails } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Arrow from '../assets/imgs/2arrow.svg';
import { getImageURL } from '../helpers/all';
import useIsMobile from '../hooks/isMobile';
import { getDialogs } from '../services/message';
import { Badge } from 'react-bootstrap';

const MenuChat = ({ chatOpen, setChatOpen, id, setId }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth?.user?.id);
  const cut = useRef(null);
  const unreadDate = useSelector((state) => state.notification.messageDate);
  const [dialogs, setDialogs] = useState({
    loading: true,
    items: [],
  });
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const onLoadDialogs = () => {
    // dispatch(updateNotification({ message: -1 }))
    getDialogs({ size: 5 })
      .then((res) => {
        setDialogs((prev) => ({
          ...prev,
          loading: false,
          items: res.dialogs,
          count: res.countOnline,
        }))
      }
      )
      .catch(() => setDialogs((prev) => ({ ...prev, loading: false })));
  };
  useEffect(() => {
    onLoadDialogs();
  }, [unreadDate]);
  // const onKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     setDialogs((prev) => ({
  //       ...prev,
  //       items: "",
  //     }))
  //     onLoadDialogs();
  //   }
  // };


  return (
    <nav className='menu-chat'>
      <ul className='menu-chat-block'>
        <li>
          <div key="system" onClick={() => setId("system")} className="preview">
            <img src="/imgs/system.png" alt="user" />
            {dialogs?.countSystem > 0 && <div className="count"><span>{dialogs?.countSystem}</span></div>}
          </div>
        </li>
        <li>
          <div key="general" onClick={() => setId("general")} className='general-chat'>
            <div className="count">
              <div class="fs-13">{dialogs.count}</div>
              <div>online</div>
            </div>
          </div>
        </li>
        <li>
          {dialogs?.items?.length > 0 && (
            dialogs.items.map((dialog) => (
              <div key={dialog.id} onClick={() => setId(dialog?.id)} className="preview">
                <img
                  src={getImageURL({
                    path: (userId == dialog.to?.id ? dialog.from?.media : dialog.to?.media),
                    size: "mini",
                    type: "user",
                  })
                  }
                  alt="userphoto"
                />
                {userId == dialog.to?.id ? dialog.from?.online?.status : dialog.to?.online?.status &&
                  <div className="indicator green"></div>}
                {dialog?.messageCount > 0 && <div className="count"><span>{dialog?.messageCount}</span></div>}
              </div>
            ))
          )}

        </li>
        <li >
          <hr />
          <NavLink to="account/messages">
            <LuMails className="svg" />
          </NavLink>
        </li>
      </ul>
      <div ref={cut} id="cut" onClick={() => (setChatOpen(!chatOpen), setId(false))} className={(chatOpen) ? 'opened' : ''}><img src={Arrow} alt="arrow" /></div>
    </nav >
  );
};

export default MenuChat;