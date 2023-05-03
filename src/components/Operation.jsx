import React from 'react';

const Operation = (props) => {
  return (
    <div className={"operation-line " + props.className}>
      <div className="date">
        <span>04.04.2023</span>
        <span className='gray ms-2'>16:36</span>
      </div>
      <div className="id"><span className='d-xl-none'>ID:</span>15296</div>
      <div className="type">Вывод средств</div>
      <div className="stat">
        <span className="blue">Исполнено</span>
      </div>
      <div className="sum">- 12 200 ₽</div>
    </div>
  );
};

export default Operation;