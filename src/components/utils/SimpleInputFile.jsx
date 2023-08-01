import React, {useState} from 'react';
import { LuImagePlus } from "react-icons/lu";

export default function SimpleInputFile(props) {
    const [files, setFiles] = useState(0);

    return (
      <label className={'input-file-simple ' + props.className}>
        {props.multiple ? (
          <input type="file" multiple onChange={(e) => setFiles(e.target.files.length)} />
        ) : (
          <input type="file" onChange={(e) => setFiles(e.target.files.length)} />
        )}
        <LuImagePlus/>
        <div className="ind">{files > 0 && files}</div>
      </label>
    );
};