import React from 'react'
import { ThemeContext, themes } from '../../contexts/ThemeContext'

function ThemeToggler() {
  console.log(themes);
    
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <label className='themes-switcher'>
          <input type='checkbox' id="theme-switch" onChange={() => {
            if (theme === themes.light) {
              setTheme(themes.dark)
              console.log('dark')
            }
            if (theme === themes.dark) {
              setTheme(themes.light)
              console.log('light')
            }
          }}
          value={theme === themes.dark} checked={theme === themes.dark}/>
        </label>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeToggler;