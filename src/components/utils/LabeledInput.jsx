import React from 'react';
import Input from './Input';

const LabeledInput = (props) => {
  return (
    <div className={"labeled-input " + props.className}>
      {
        (props.type === 'password')
          ? <Input placeholder={props.placeholder} />
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
              : <input type={props.type} placeholder={props.placeholder} />
      }
      <label>
        <span>{props.label}</span>
        {/* <CheckMark className="pale-blue fs-13 ms-2"/> */}
      </label>
    </div>
  );
};

export default LabeledInput;