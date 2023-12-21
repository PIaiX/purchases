import { memo } from "react";

const Textarea = memo(
  ({
    name,
    label,
    placeholder,
    defaultValue,
    register,
    errors,
    required,
    rows = 4,
    onChange,
    readOnly = true,
    type,
    validation,
  }) => {
    return (
      <div
        className={
          "labeled-input " +
          (errors && errors[name]?.type === "required" ? " error" : "")
        }
      >
        {label && (
          <label htmlFor={name}>
            <span>
              {label}
              {required && "*"}
            </span>
          </label>
        )}
        <textarea
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          onChange={(e) =>
            onChange && !register && onChange(e.target.value)
          }
          {...(register && { ...register(name, validation) })}
          readOnly={!readOnly && "readonly"}
          {...(register && { ...register(name, validation) })}
        />

        {errors && errors[name]?.type === "required" && (
          <p className="error-text fs-07">{errors[name]?.message}</p>
        )}
      </div>
    );
  }
);

export default Textarea;
