import React from 'react';
import { Link } from 'react-router-dom';
import { RxChevronRight } from "react-icons/rx";

const AppealLine = ({ id, title, status, comment, type, dialogId }) => {
  return (
    <div className="appeal-line">
      <div className="subject">Предложения по функционалу</div>
      <div className="id"><span className='d-xl-none'>ID:</span>{id}</div>
      <div className="status">
        <span className="blue">{status != "new" ? status == "close" ? "Закрыт" : "На рассмотрении" : "Новый"}</span>
      </div>
      <div className="date">
        <time>
          <span>04.04.2023</span>
          <span className='ms-3 gray'>16:36</span>
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