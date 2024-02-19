import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../store/reducers/themeSlice';

function ThemeToggler() {
  const theme = useSelector(state => state.theme.value)
  const dispatch = useDispatch();
  const toggleTheme = (e) => {
    dispatch(setTheme(e.target.checked ? 'dark' : 'light'));
  };

  return (
    <label className="themes-switcher">
      <input
        type="checkbox"
        id="theme-switch"
        defaultChecked={theme === 'dark'}
        onClick={toggleTheme}
      />
    </label>
  );
}

export default ThemeToggler;
