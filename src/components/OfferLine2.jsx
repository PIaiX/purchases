import React from 'react';
import { FiEdit } from "react-icons/fi";

const OfferLine2 = (props) => {
  return (
    <div className="offer-line-2">
      <div className="descr">Airin + Blackbird, Повелитель Бури СХ 109 и 50%/ДУАЛ АРХИМАГ 105, 109 уровень, Тёмные эльфы, Одетый (подробности в описании)  Повелитель Бури СХ 109 и 50%/....</div>
      <div className='d-flex align-items-center'>
        <div className='price'>1&nbsp;697&nbsp;&nbsp;₽</div>
        <div className="btns">
          <button type='button'><FiEdit/></button>
        </div>
      </div>
    </div>
  );
};

export default OfferLine2;