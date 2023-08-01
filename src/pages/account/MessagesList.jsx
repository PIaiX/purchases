import React from 'react';
import DialogPreview from './DialogPreview';
import {Link} from 'react-router-dom';

const MessagesList = () => {
  return (
    <div className='sec-messages-list'>
      <form action="" className='p-2 p-sm-3'>
        <input type="search" placeholder='Поиск пользователя' className='p-blue'/>
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
        <li>
          <DialogPreview link={'1'}/>
        </li>
        <li>
          <DialogPreview link={'2'}/>
        </li>
        <li>
          <DialogPreview link={'3'}/>
        </li>
      </ul>
    </div>
  );
};

export default MessagesList;