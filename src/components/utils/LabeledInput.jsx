import React, { useState } from "react";
import Eye from '../svg/Eye';
import CloseEye from '../svg/CloseEye';
// import CheckMark from '../svg/CheckMark'

const LabeledInput = ({
  onChange,
  type,
  label,
  className,
  rows,
  placeholder,
  name,
  options,
  register,
  validation,
  errors,
}) => {
  const [visible, setVisibility] = useState(false);
  return (
    <>
      <div className={"labeled-input " + className}>
        {type === "password" ? (
          <div className="password">
            <input
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              minLength="8"
              maxLength="20"
              size="8"
              required
              placeholder={placeholder}
              onChange={(e) =>
                onChange && !register && onChange(e.target.value)
              }
              {...(register && { ...register(name, validation) })}
            />
            <button type="button" onClick={() => setVisibility(!visible)}>
              {visible ? <Eye /> : <CloseEye />}
            </button>
          </div>
        ) : type === "select" ? (
          <select
            onChange={(e) => onChange && !register && onChange(e.target.value)}
            {...(register && { ...register(name, validation) })}
          >
            <option value="0" selected disabled>
              Выбрать
            </option>
            {options.map((obj) => {
              return (
                <option key={obj.value} value={obj.value}>
                  {obj.text}
                </option>
              );
            })}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name=""
            rows={rows}
            placeholder={placeholder}
            onChange={(e) => onChange && !register && onChange(e.target.value)}
            {...(register && { ...register(name, validation) })}
          ></textarea>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange && !register && onChange(e.target.value)}
            {...(register && { ...register(name, validation) })}
          />
        )}
        <label>
          <span>{label}</span>
          {/* <CheckMark className="pale-blue fs-13 ms-2"/> */}
        </label>
      </div>
      {errors && errors[name]?.type === "required" && (
        <p className="rose fs-08">{errors[name]?.message}</p>
      )}
    </>
  );
};

export default LabeledInput;
