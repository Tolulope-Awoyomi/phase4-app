import React from 'react'

function Header({ isDarkMode, onDarkModeClick }) {
  return (
    <header>
        <br></br>
        <button onClick={onDarkModeClick}>
            {isDarkMode ? "Light" : "Dark"} Mode
        </button>
    </header>
  )
}

export default Header