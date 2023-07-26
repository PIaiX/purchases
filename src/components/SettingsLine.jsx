import React from 'react';
import { GoSignOut } from "react-icons/go";

const SettingsLine = (props) => {
  return (
    <div className="settings-line">
      <div className="session">
        <span>04.04.2023</span>
        <span className='gray ms-2'>16:36</span>
      </div>
      <div className="system">Windows</div>
      <div className='browser'>Opera 99.0.0.0 (WebKit 537.36)</div>
      <div className='ip'>92.255.507.207</div>
      <div className='region'>Казань</div>
      <div className="btns">
        <button type='button'><GoSignOut/></button>
      </div>
    </div>
  );
};

export default SettingsLine;