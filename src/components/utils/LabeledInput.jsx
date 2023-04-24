import React from 'react';
import InputPassword from './InputPassword'
import CheckMark from '../svg/CheckMark'

const LabeledInput = (props) => {
  return (
    <div className={"labeled-input " + props.className}>
      {
        (props.type === 'password')
        ? <InputPassword />
        : <input type={props.type} />
      }
      <label>
        <span>{props.label}</span>
        <CheckMark className="pale-blue fs-13 ms-2"/>
      </label>
    </div>
  );
};

export default LabeledInput;