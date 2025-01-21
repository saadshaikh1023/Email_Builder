/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';

const EmailEditor = ({ onUpdate, initialValue = '' }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'clean'],
      [{ 'align': [] }]
    ]
  };

  return (
    <div className="email-editor">
      <ReactQuill 
        theme="snow"
        value={initialValue}
        onChange={onUpdate}
        modules={modules}
        className="h-[300px] sm:h-[400px] text-black"
      />
    </div>
  );
};

export default EmailEditor;