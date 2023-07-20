import React, { useEffect, useState } from 'react';
import { FiPaperclip } from "react-icons/fi";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function InputFileImg(props) {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const changeHandler = (e) => {
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }
      setFile(file);
    }

    useEffect(() => {
      let fileReader, isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURL(result)
          }
        }
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
  
    }, [file]);

    return (
      <div className='files'>
        <label className={'files-label ' + props.className}>
          <input
            type="file"
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={changeHandler}
          />
          <div className="icon"><FiPaperclip /></div>
          <span className='blue ms-2'>Прикрепить файл</span>
        </label>
        {fileDataURL ?
          <ul className='files-list'>
            <li>
              {
                <img src={fileDataURL} alt="preview" />
              }
            </li>
          </ul> : null
        }
      </div>
    );
};