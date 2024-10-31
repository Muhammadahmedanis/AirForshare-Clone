import React, { useRef } from 'react'
import './index.scss'
function Textarea({ onChange }) {
  const textRef = useRef();
  const handleTextResize = () => {
    textRef.current.style.height = '20px';
    textRef.current.style.height = textRef.current.scrollHeight + 12 + 'px';
  }

  return (
    <div>
      <textarea onChange={onChange} onInput={handleTextResize} ref={textRef} placeholder='Type something...' className='text-area'></textarea>
    </div>
  )
}

export default Textarea