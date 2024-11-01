import React, { useEffect, useRef } from 'react'
import './index.scss'
function Textarea({ value, onChange }) {
  const textRef = useRef();
  const handleTextResize = () => {
    textRef.current.style.height = '20px';
    textRef.current.style.height = textRef.current.scrollHeight + 12 + 'px';
  }

  useEffect(() => {
    handleTextResize();
  }, [value])

  return (
    <div>
      <textarea value={value} onChange={onChange} onInput={handleTextResize} ref={textRef} placeholder='Type something...' className='text-area'></textarea>
    </div>
  )
}

export default Textarea