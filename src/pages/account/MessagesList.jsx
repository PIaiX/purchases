import React, { useEffect, useState } from "react";
import DialogPreview from './DialogPreview';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  createMessage,
  getDialogs,
  getMessages,
  viewMessages,
} from "../../services/message";
import socket from "../../config/socket";

const MessagesList = () => {
  const fromId = useSelector(state => state.auth.user.id);

  const [dialogs, setDialogs] = useState({
    loading: true,
    items: [],
  });
  const [selectedDialog, setSelectedDialog] = useState(null);

  useEffect(() => {
    // Получение списка диалогов
    socket.emit('getDialogs', { fromId });

    // Обработка получения списка диалогов с сервера
    socket.on('dialogsList', (dialogsList) => {
      getDialogs(data)
        .then((res) =>
          setDialogs((prev) => ({
            ...prev,
            loading: false,
            ...res,
          }))
        )
        .catch(() => setMessages((prev) => ({ ...prev, loading: false })));

    });
  }, []);

  const handleDialogSelect = (dialog) => {
    setSelectedDialog(dialog);
    // Отправка запроса на сервер для открытия выбранного диалога
    socket.emit('openDialog', dialog.id);
  };
  return (
    <div className='sec-messages-list'>
      <form action="" className='p-2 p-sm-3'>
        <input type="search" placeholder='Поиск пользователя' className='p-blue' />
      </form>
      <ul>
        <li>
          <Link to="general" className='general-chat'>
            <div className="count">
              <div class="fs-13">102</div>
              <div>online</div>
            </div>
            <h6>Общий чат</h6>
          </Link>
        </li>
        {dialogs.items ? (
          dialogs.items.map((dialog) => (
            <li>
              <DialogPreview link={'1'} />
            </li>
          ))) : (
          <p className="w-100 py-5 text-center text-muted fs-09 d-flex flex-column align-items-center justify-content-center">
            В данный момент нет диалогов. . . .
          </p>
        )
        }
      </ul>
    </div>
  );
};

export default MessagesList;