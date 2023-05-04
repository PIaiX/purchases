import React from 'react';
import DialogPreview from './DialogPreview';

const MessagesList = () => {
  return (
    <div className='sec-messages-list'>
      <form action="" className='p-2 p-sm-3'>
        <input type="search" placeholder='Поиск пользователя' className='p-blue'/>
      </form>
      <ul>
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