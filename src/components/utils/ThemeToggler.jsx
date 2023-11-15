import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from "../../contexts/ThemeContext";

function ThemeToggler() {
  const [theme, setTheme] = useState('light'); // Устанавливаем начальное состояние темы

  useEffect(() => {
    document.documentElement.dataset.theme = theme; // Применяем тему к документу при обновлении
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light')); // Инвертируем текущую тему при нажатии
  };
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <label className="themes-switcher">
          <input
            type="checkbox"
            id="theme-switch"
            onClick={toggleTheme}
          />
        </label>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeToggler;
