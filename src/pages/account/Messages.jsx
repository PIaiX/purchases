import React from 'react';
import { Outlet } from 'react-router-dom'
import MessagesList from './MessagesList';
import ReturnTitle from '../../components/utils/ReturnTitle';

const Messages = ({ isMobileXL }) => {
  return (
    <>
      <ReturnTitle link={'/account'} title={'Сообщения'} />
      <section className='sec-messages'>
        {
          (isMobileXL)
            ? <Outlet />
            : <>
              <MessagesList />
              <Outlet />
            </>
        }
      </section>
    </>
  );
};

export default Messages;