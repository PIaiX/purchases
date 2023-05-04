import React from 'react';
import { Outlet } from 'react-router-dom'
import MessagesList from './MessagesList';
import {Link} from 'react-router-dom';
import ReturnIcon from '../../components/svg/ReturnIcon';

const Messages = ({isMobileXL}) => {
  return (
    <>
    <div className="d-flex align-items-center mb-4 mb-lg-5">
        <Link to='/account' className='d-flex d-lg-none link-2 me-4'>
          <ReturnIcon className="fs-20"/>
        </Link>
        <h1 className='h2 mb-0'>Сообщения</h1>
      </div>
      <section className='sec-messages'>
        {
          (isMobileXL)
          ? <Outlet/>
          : <>
            <MessagesList/>
            <Outlet/>
          </>
        }
      </section>
    </>
  );
};

export default Messages;