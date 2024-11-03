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
import { db, ref, set, onValue, remove, storage, uploadBytesResumable, storageRef, getDownloadURL} from '../../db';
import CodeEditor from '../../components/CodeEditor';
// import JSZip from  'jszip';

function Home() {
    const[type, setType] = useState('text');
    const[text, setText] = useState('');
    const[file, setFile] = useState([]);
    const[isText, setIsText] = useState(false);
    const[tempFile, setTempFile] = useState([]);

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

    // const downloadAll = () => {
    //     let filename = "MultiFilesDownload";
    //     const urls = file?.map(val => val.url)
    //       const zip = new JSZip()
    //       const folder = zip.folder('project')
    //       urls.forEach((url)=> {
    //      const blobPromise =  fetch(url)    
    //   .then(function (response) {  
    //     console.log({response})             
    //       if (response.status === 200 || response.status === 0) {
    //           return Promise.resolve(response.blob());
    //       } else {
    //           return Promise.reject(new Error(response.statusText));
    //       }
    //   })                          
    //    const name = url.substring(url.lastIndexOf('/'))
    //           folder.file(name, blobPromise)
    //       })
      
    //       zip.generateAsync({type:"blob"})
    //           .then(blob => saveAs(blob, filename))
    //           .catch(e => console.log(e));
    // }

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
                                    <div onClick={deleteAllFiles} className='delete-btn'>
                                        <div><MdDelete size={22} /> Delete All</div>
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
  )
}

export default Home