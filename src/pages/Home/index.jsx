import React, { useEffect, useState } from 'react'
import './css/style.scss' 
import { BsTextLeft } from "react-icons/bs";
import { PiFileTextDuotone } from "react-icons/pi";
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import DropZone from '../../components/DropZone';
import FileList from '../../components/FileList';
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { db, ref, set, onValue, remove } from '../../db';
import CodeEditor from '../../components/CodeEditor';

function Home() {
    const[type, setType] = useState('text');
    const[text, setText] = useState('');
    const[file, setFile] = useState([]);
    const[isText, setIsText] = useState(false);
    const onDrop = acceptedFiles => {
        setFile([...file, ...acceptedFiles])
    }

    const saveChanges = () => {
        set(ref(db, 'sharing'), {
            textValue: text,
        });
    }

    const clearText = async() => {
        await remove(ref(db, 'sharing'));
        setText('');
        setIsText(false);
    }

    useEffect(() => {
        const starCountRef = ref(db, 'sharing');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setText(data?.textValue)
        if(data?.textValue){
            setIsText(true)
        }
        });
    }, [])

    const links = text?.match(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g)

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
                    <li className='login-btn'>Code Snipet</li>
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
                                {/* <CodeEditor className='text-area' text={text} setText={setText}
                                /> */}
                                     
                                    {/* // onChange={(e) => {
                                    // setText(e.target.value)
                                    // setIsText(false)
                                    // }) */}
                                <Textarea value={text} onChange={(e) => {
                                    setText(e.target.value)
                                    setIsText(false)
                                    }
                                } />
                            </div>
                            <div className='text-footer'>
                                <div className='links'>
                                    {
                                        links?.map((val, ind) => (
                                            <div key={ind}>
                                                <span>
                                                    <a href={'https'} target="_blank" rel="noopener noreferrer">{ val }</a>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='save-btn'>
                                    <span onClick={clearText}>{text && 'Clear'}</span>
                                    {
                                        isText ? <Button onClick={() => {
                                            navigator.clipboard.writeText(text)
                                        }} title={'Copy'} disabled={!text} /> :
                                        <Button onClick={saveChanges} title={'Save'} disabled={!text} />
                                    } 
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='file-section'>
                            <div className='files-header'>
                                <h1>Files</h1>
                                <div className='files-btn'>
                                    <div className='download-btn'>
                                        <div><FaDownload size={22} /> Download All</div>
                                    </div>
                                    <div onClick={() => setFile([])} className='delete-btn'>
                                        <div><MdDelete size={22} /> Delete All</div>
                                    </div>
                                </div>
                            </div>
                            {
                                file.length ? <FileList file={file} onDrop={onDrop} /> :
                                <DropZone 
                                onDrop={onDrop}
                                title={
                                    <>
                                        Drag and drop any files up to 2 files, 5Mbs each or <span>Browse Upgrade </span> to get more space
                                    </>
                                } />
                            }
                            
                        </div>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Home