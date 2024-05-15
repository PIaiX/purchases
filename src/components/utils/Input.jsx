import React, { memo, useState } from "react";
import Eye from "../svg/Eye";
import CloseEye from "../svg/CloseEye";
import ReactInputMask from "react-input-mask";
// import CheckMark from '../svg/CheckMark'

const Input = memo(
  ({
    value,
    autoComplete,
    onFocus,
    onClick,
    onChange,
    type,
    label,
    className,
    mask = false,
    defaultValue,
    placeholder,
    name,
    autoFocus,
    register,
    readOnly,
    validation,
    minLength = 0,
    maxLength = 250,
    errors,
    max,
    min,
  }) => {
    const [visible, setVisibility] = useState(false);
    return (
      <>
        <div className={"labeled-input " + className}>
          {type === "password" ? (
            <div className="password">
              <input
                max={max}
                min={min}
                value={value}
                autocomplete={autoComplete}
                onClick={onClick}
                onFocus={onFocus}
                readOnly={readOnly}
                defaultValue={defaultValue}
                autoFocus={autoFocus}
                type={visible ? "text" : "password"}
                minLength={minLength}
                maxLength={maxLength}
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
          ) : mask ? (
            <ReactInputMask
              min={min}
              max={max}
              value={value}
              autocomplete={autoComplete}
              onClick={onClick}
              onFocus={onFocus}
              readOnly={readOnly}
              autoFocus={autoFocus}
              mask={mask}
              type={type}
              required
              defaultValue={defaultValue}
              placeholder={placeholder}
              onChange={(e) =>
                onChange && !register && onChange(e.target.value)
              }
              {...(register && { ...register(name, validation) })}
            />
          ) : (
            <input
              min={min}
              max={max}
              value={value}
              autocomplete={autoComplete}
              onClick={onClick}
              onFocus={onFocus}
              readOnly={readOnly}
              defaultValue={defaultValue}
              autoFocus={autoFocus}
              type={type}
              minLength={minLength}
              maxLength={maxLength}
              required
              placeholder={placeholder}
              onChange={(e) =>
                onChange && !register && onChange(e.target.value)
              }
              {...(register && { ...register(name, validation) })}
            />
          )}
          <label>
            <span>{label}</span>
          </label>
        </div>
        {errors && (
          <p className="rose fs-08">{errors[name]?.message}</p>
        )}
      </>
    );
  }
);

export default Input;
