import React, { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const langsArr = [
  {
    title: "Русский",
    state: true,
    img: "/imgs/flags/ru.png",
  },
  {
    title: "English",
    state: false,
    img: "/imgs/flags/ru.png",
  },
];

const LanguageSwitcher = () => {
  const [lang, setLang] = useState(langsArr);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const ref = useRef();

  const handleClick = (elTitle) => {
    setLang(
      lang.map((item) => {
        if (item.title === elTitle) {
          return { ...item, state: true };
        } else {
          return { ...item, state: false };
        }
      })
    );
    setShowSwitcher(false);
  };

  useOnClickOutside(ref, () => setShowSwitcher(false));

  return (
    <div
      ref={ref}
      className={showSwitcher ? "lang-switcher opened" : "lang-switcher"}
    >
      <button type="button" onClick={() => setShowSwitcher(!showSwitcher)}>
        <img
          src={lang.reduce(
            (res, obj) => (obj.state === true ? obj.img : res),
            ""
          )}
          alt="flag"
        />
        <span>
          {lang.reduce(
            (res, obj) => (obj.state === true ? obj.title : res),
            ""
          )}
        </span>
      </button>
      {showSwitcher && (
        <ul>
          {lang
            .filter((obj) => obj.state === false)
            .map((el) => {
              return (
                <li key={el.title}>
                  <button type="button" onClick={() => handleClick(el.title)}>
                    <img src={el.img} alt="flag" />
                    <span>{el.title}</span>
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
