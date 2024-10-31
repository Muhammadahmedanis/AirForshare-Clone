import React from 'react'

function Button({ title, onClick, disabled }) {
  return (
        <button style={{borderColor: disabled && '#d8d6d6'}} disabled={disabled} className='btn' onClick={onClick}>{title}</button>
  )
}

export default Button
