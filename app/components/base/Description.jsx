"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Desctiption(props) {
  const { value, onChange, placeholder } = props;
  const [text, setText] = useState(value);

  const changeDescription = (e) => {
    setText(e.htmlValue);
    onChange?.(e.htmlValue);
  };

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);
  return (
    <ReactQuill theme="snow" value={text} onChange={setText} />
  );
}

export default Desctiption;
