/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './styles.css';

const Preview = ({ title, content, imageUrl, footer }) => {
  return (
    <div className="preview">
      <div className="preview-content">
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        )}
        
        {content && (
          <div 
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {imageUrl && (
          <div className="mb-6">
            <img 
              src={imageUrl} 
              alt="Email content" 
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        {footer && (
          <footer className="text-sm text-gray-600 pt-4 border-t border-gray-200">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Preview;