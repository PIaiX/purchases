import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";

export default function SimpleInputFile(props) {
  const [filesCount, setFilesCount] = useState(0);
  const onChange = props.onChange
  const handleFileChange = (e) => {
    setFilesCount(e.target.files.length);
    onChange(e)
  }
  return (
    <label className={'input-file-simple ' + props.className}>
      {props.multiple ? (
        <input type="file" multiple onChange={handleFileChange} />
      ) : (
        <input type="file" onChange={handleFileChange} />
      )}
      <LuImagePlus />
      <div className="ind">{filesCount > 0 && filesCount}</div>
    </label>
  );
}