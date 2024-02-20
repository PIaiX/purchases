import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";

export default function SimpleInputFile({ setImage, media, className, multiple }) {
  const onChange = (e) => {
    setImage(e.target.files)
  }
  return (
    <label className={'input-file-simple ' + className}>
      {multiple ? (
        <input type="file" multiple onChange={(e) => onChange(e)} />
      ) : (
        <input type="file" onChange={(e) => onChange(e)} />
      )}
      <LuImagePlus />
      <div className="ind">{media && media.length > 0 && media.length}</div>
    </label>
  );
}