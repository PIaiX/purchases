import React from 'react';
import {NavLink} from 'react-router-dom';

const DialogPreview = (props) => {
  return (
    <NavLink to={props.link} className="dialog-preview">
      <img src="imgs/user.jpg" alt="user" />
      <div className="indicator green"></div>
      <div className="text">
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <h6>Obnyalpodnyal</h6>
          <time>3 дня назад</time>
        </div>
        <p>Куплю аккаунт в игре Marvel Future Fight</p>
      </div>
    </NavLink>
  );
};

export default DialogPreview;