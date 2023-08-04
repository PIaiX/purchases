import React, { memo, useState } from "react";
import Eye from "../svg/Eye";
import CloseEye from "../svg/CloseEye";
import ReactInputMask from "react-input-mask";
// import CheckMark from '../svg/CheckMark'

const Input = memo(
  ({
    onChange,
    type,
    label,
    className,
    mask = false,
    placeholder,
    name,
    autoFocus,
    register,
    validation,
    minLength = 0,
    maxLength = 250,
    errors,
  }) => {
    const [visible, setVisibility] = useState(false);
    return (
      <>
        <div className={"labeled-input " + className}>
          {type === "password" ? (
            <div className="password">
              <input
                autoFocus={autoFocus}
                type={visible ? "text" : "password"}
                autoComplete="current-password"
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
              autoFocus={autoFocus}
              mask={mask}
              type={type}
              required
              placeholder={placeholder}
              onChange={(e) =>
                onChange && !register && onChange(e.target.value)
              }
              {...(register && { ...register(name, validation) })}
            />
          ) : (
            <input
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
        {errors && errors[name]?.type === "required" && (
          <p className="rose fs-08">{errors[name]?.message}</p>
        )}
      </>
    );
  }
);

export default Input;
