import React from 'react';
import InputPassword from './InputPassword'
import CheckMark from '../svg/CheckMark'

const LabeledInput = (props) => {
  return (
    <div className={"labeled-input " + props.className}>
      {
        (props.type === 'password')
        ? <InputPassword />
        : (props.type === 'select')
        ? <select>
          <option value="0" selected disabled>Выбрать</option>
          {
            props.options.map(obj => {
              return <option key={obj.value} value={obj.value}>{obj.text}</option>
            })
          }
        </select>
        : (props.type === 'textarea')
        ? <textarea name="" rows={props.rows} placeholder={props.placeholder}></textarea>
        :<input type={props.type} />
      }
      <label>
        <span>{props.label}</span>
        <CheckMark className="pale-blue fs-13 ms-2"/>
      </label>
    </div>
  );
};

export default LabeledInput;