import React from 'react';
import { Link } from 'react-router-dom';
import { RxChevronRight } from "react-icons/rx";
import { isTitle } from '../helpers/titles';
import moment from 'moment';

const AppealLine = ({ id, title, status, createdAt, comment, type, dialogId }) => {
  return (
    <div className="appeal-line">
      <div className="subject">{isTitle(title)}</div>
      <div className="id"><span className='d-xl-none'>ID:</span>{id}</div>
      <div className="status">
        <span className="blue">{status != "new" ? status == "close" ? "Закрыт" : "На рассмотрении" : "Новый"}</span>
      </div>
      <div className="date">
        <time>
          <span>{createdAt ? moment(createdAt).format("DD MMMM YYYY") : null}</span>
          <span className='ms-3 gray'>{createdAt ? moment(createdAt).format("HH:MM") : null}</span>
        </time>
      </div>
      <div className="btns">
        <Link to={id}>
          <RxChevronRight className='fs-13 blue' />
        </Link>
      </div>
    </div>
  );
};

export default AppealLine;