import React from 'react'
import { CiFileOn } from "react-icons/ci";
import { ImHtmlFive2 } from "react-icons/im";
import './index.scss'
import DropZone from './DropZone';
import { FaPlus } from "react-icons/fa6";
import { SiCss3 } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

function FileList({ file, onDrop }) {
    console.log(file);
  return (
    <div className='files-list'>
            { file.map((val, ind) =>{
                let icon;
                switch (val.type) {
                    case 'text/html':
                        icon = <ImHtmlFive2 size={38} />
                        break;
                    case 'text/css':
                        icon = <SiCss3 size={38} />
                        break;
                    case 'text/javascript':
                        icon = <IoLogoJavascript size={38} />
                        break;
                    default:
                        icon =<CiFileOn size={38} />
                        break;
                }

            return (
                    <div key={ind}> 
                    {
                        val.type.indexOf('image') !== -1 ? <img height={70} width={70} src={URL.createObjectURL(val)} alt="" /> :
                        <>
                            {icon} 
                            <span>{val.name.slice(0, 15)}</span>
                        </>
                    }
                    </div>
                    )
                }
            )
        }
        <div>
        {/* <b>{val.name.slice(val.name.lastIndexOf('.'))}</b>  */}
            <DropZone onDrop={onDrop} title={
                <>
                <span className='addMore-file'>
                    <FaPlus />
                    <b>Add File</b>
                    <p>(Up to 5MB)</p>
                </span>
                </>
            }/>
        </div>
    </div>
  )
}

export default FileList