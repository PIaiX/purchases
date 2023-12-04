import React from 'react';
import UserMessage from '../../components/chat/UserMessage';
import MyMessage from '../../components/chat/MyMessage';
import send from '../../assets/imgs/send.svg';
import WarningIcon from '../../components/svg/WarningIcon';
import { Link, useParams } from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';
import Chat from '../../components/chat/Chat';
import ChatGeneral from '../../components/chat/ChatGeneral';

const MessagesChat = () => {
  const { dialogId } = useParams();
  let ChatComponent = null;
  if (dialogId == ':dialogId') {
    return null;
  }
  else if (dialogId == 'general') {
    ChatComponent = <ChatGeneral />;
  } else {
    ChatComponent = <Chat />;
  }
  return (
    <div className="sec-messages-chat">
      <Link to='/account/messages' className='d-flex align-items-center d-xl-none return-icon ms-4 mb-2'>
        <ReturnIcon />
      </Link>
      {ChatComponent}
    </div>
  );
};

export default MessagesChat;