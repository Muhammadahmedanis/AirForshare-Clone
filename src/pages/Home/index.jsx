import React, { useEffect, useState } from 'react'
import { db, ref, set, onValue, remove, storage, uploadBytesResumable, storageRef, getDownloadURL} from '../../db';
import { BsTextLeft } from "react-icons/bs";
import { PiFileTextDuotone } from "react-icons/pi";
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import DropZone from '../../components/DropZone';
import FileList from '../../components/FileList';
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import TogglrButton from '../../components/TogglrButton';
import { ThemeProvider } from '../../context/ThemeContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import CodeEditor from '../../components/CodeEditor';
import './css/style.scss' 
import { Link } from 'react-router-dom';
import About from '../../components/About';

function Home() {
    const[type, setType] = useState('text');
    const[text, setText] = useState('');
    const[file, setFile] = useState([]);
    const[isText, setIsText] = useState(false);
    const[tempFile, setTempFile] = useState([]);
    const[themeMode, setThemeMode] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const lightTheme = () => {
        setThemeMode('light')
    }
    const darkTheme = () => {
        setThemeMode('dark')
    }
    useEffect(() => {
        if(themeMode ===  'dark'){
            document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(0 0 0 / 65%)';
            document.getElementsByTagName('body')[0].style.color = 'white';
        }else{
            document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
            document.getElementsByTagName('body')[0].style.color = 'black';
        }
    }, [themeMode])


    const onDrop = async (acceptedFiles) => {
        setTempFile((prevTempFile) => [...prevTempFile, ...acceptedFiles])
        let arr = [];
        for(let i = 0; i < acceptedFiles.length; i++){
            arr.push(uploadFile(acceptedFiles[i], file?.length + i));
        }
        const allFiles = await Promise.all(arr);
        setFile((prevFiles = []) => {
            const updFiles = [...prevFiles, ...allFiles]
            console.log(prevFiles);
            set(ref(db, 'file-sharing'), {
                files: updFiles,
            });
            return updFiles;
        });
        setTempFile([]);
    }
    console.log("Files: ", file);

    const uploadFile = (files, i) => {
        return new Promise((resolve, reject) => {
            const storageFile = storageRef(storage, `files/file-${i}`);
            const uploadTask = uploadBytesResumable(storageFile, files);
            uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
        }, 
        (error) => {
            reject(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({url: downloadURL, type: files.type, name: files.name});
            });
        }
        );
    })
    }

    const saveChanges = () => {
        set(ref(db, 'text-sharing'), {
            textValue: text,
        });
    }

    const clearText = async() => {
        await remove(ref(db, 'text-sharing'));
        setText('');
        setIsText(false);
    }

    const deleteAllFiles = async() => {
        await remove(ref(db, 'file-sharing'));
        setFile([]);
    }

    useEffect(() => {
        const textRef = ref(db, 'text-sharing');
        onValue(textRef, (snapshot) => {
        const data = snapshot.val();
        setText(data?.textValue)
        if(data?.textValue){
            setIsText(true)
        }
        });

        const fileRef = ref(db, 'file-sharing');
        onValue(fileRef, (snapshot) => {
        const data = snapshot.val();
        setFile(data?.files || [])
        });


    }, [])

  const links = text?.match(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g)
  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
    <div  className='container'>
    <div className='header-bar'>
            <div className='logo'>
                <img src="https://www.airforshare.com/assets/img/logo.svg" alt="Logo" />
            </div>

            {/* Full-screen menu for larger screens */}
            <div className="menu-bar">
                <ul>
                    <li className='login-btn'>Home</li>
                    <Link to={"about"}><li style={{ color: themeMode !== 'light' ? 'white' : 'black' }}>How it works</li></Link>
                    {/* <li style={{ color: themeMode !== 'light' ? 'white' : 'black' }}>Downloads</li> */}
                    <li><TogglrButton /></li>
                </ul>
            </div>

            {/* Hamburger icon for small screens */}
            <div className='hamburger' onClick={toggleMenu}>
                <FaBars size={24} />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-btn" onClick={toggleMenu}>
                    <FaTimes size={24} />
                </div>
                <ul>
                    <li className='login-btn'>Home</li>
                    <Link to={"about"}><li style={{ color: themeMode !== 'light' ? 'white' : 'black' }}>How it works</li></Link>
                    {/* <li style={{ color: themeMode !== 'light' ? 'white' : 'black' }}>Downloads</li> */}
                    <li><TogglrButton /></li>
                </ul>
            </div>
        </div>


        <div style={{backgroundColor: themeMode == 'light' ? 'white' : 'rgb(0 0 0 / 0%)'}} className='main-card'>
            <div  className='card-sidebar '>
                    <>
                        <div onClick={() => setType('text')} className={type === "text" ? 'active' : ''}>
                            <BsTextLeft size={40} />
                        </div>
                        <div onClick={() => setType('files')} className={type === "files" ? 'active' : ''}>
                            <PiFileTextDuotone size={40} />
                        </div>
                    </>
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
                                <Textarea themeMode={themeMode} value={text} onChange={(e) => {
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
                                        isText ? <Button themeMode={themeMode} onClick={() => {
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
                                        <div><FaDownload size={22} /> <span className='small'>Download All</span> </div>
                                    </div>
                                    <div style={{color: themeMode != 'light' && 'red'}} onClick={deleteAllFiles} className='delete-btn'>
                                        <div><MdDelete size={22} /> <span className='small'>Delete All</span> </div>
                                    </div>
                                </div>
                            </div>
                            {
                                tempFile?.length || file?.length ? <FileList tempFile={tempFile} file={file} onDrop={onDrop} /> :
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
    </ThemeProvider>
  )
}

export default Home