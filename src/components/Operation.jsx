import React from 'react';
import moment from "moment";

const Operation = ({ createdAt, orderId, id, status, price, className }) => {
  return (
    <div className={"operation-line"}>
      <div className="date">
        <time>
          <span>{moment(createdAt).format("DD.MM.YYYY")}</span>
          <span className='ms-3 gray'>{moment(createdAt).format("kk:mm")}</span>
        </time>
      </div>
      <div className="id"><span className='d-xl-none'>ID:</span>{id}</div>
      {orderId ?
        (price > 0 ? (
          < div className="type">Покупка</div>
        ) : (
          < div className="type">Продажа</div>
        )) : (
          price > 0 ? (
            < div className="type">Пополнение</div>
          ) : (
            < div className="type">Вывод средств</div>
          ))
      }
      <div className="stat">
        {status == "ok" ?
          <span className="blue">Исполнено</span>
          : <span className="green">В обработке</span>

        }
      </div>
      <div className="sum">{price}</div>
    </div >
  );
};

export default Operation;