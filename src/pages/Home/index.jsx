import React, { useState } from 'react'
import './css/style.scss' 
import { BsTextLeft } from "react-icons/bs";
import { PiFileTextDuotone } from "react-icons/pi";
import Textarea from '../../components/Textarea';

function Home() {
    const[type, setType] = useState('text');
  return (
    <div className='container'>
        <div className='header-bar'>
            <div className='logo'>
                <img src="https://www.airforshare.com/assets/img/logo.svg" alt="" />
            </div>
            <div className='menu-bar'>
                <ul>
                    <li>How it works</li>
                    <li>Downloads</li>
                    <li>Upgrade</li>
                    <li>Feedback</li>
                    <li className='login-btn'>Login / Register</li>
                </ul>
            </div>
        </div>

        <div className='main-card'>
            <div className='card-sidebar'>
                <div onClick={() => setType('text')} className={type === "text" ? 'active' : ''}>
                <BsTextLeft size={40}/>
                </div>
                <div onClick={() => setType('files')} className={type === "files" ? 'active' : ''}>
                    <PiFileTextDuotone size={40}/>
                </div>
            </div>
            <div className='card-container'>
                {
                    type === "text" ? 
                    (
                        <div className='text-section'>
                            <h1>Text</h1>
                            <div className='resize-section'>
                                <Textarea />
                            </div>
                        </div>
                    ) :
                    (
                        <div className='file-section'>
                            <h1>Files</h1>
                        </div>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Home