import React from 'react'

function Button({ title, onClick, disabled, themeMode }) {
  return (
        <button style={{borderColor: disabled && '#d8d6d6', color: themeMode !== 'light' ? 'white' : 'black'}} disabled={disabled} className='btn' onClick={onClick}>{title}</button>
  )
}

export default Button
