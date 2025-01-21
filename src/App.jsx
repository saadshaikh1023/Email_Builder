// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import EmailEditor from './components/EmailEditor';
import ImageUpload from './components/ImageUpload';
import Preview from './components/Preview';
import './styles/index.css';

function App() {
  const [emailData, setEmailData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    footer: ''
  });

  const handleTitleChange = (e) => {
    setEmailData({ ...emailData, title: e.target.value });
  };

  const handleContentUpdate = (content) => {
    setEmailData({ ...emailData, content });
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmailData({ ...emailData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleFooterChange = (e) => {
    setEmailData({ ...emailData, footer: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Email Builder</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Editor</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={emailData.title}
                    onChange={handleTitleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                    placeholder="Enter email title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <EmailEditor onUpdate={handleContentUpdate} initialValue={emailData.content} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <ImageUpload onImageUpload={handleImageUpload} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer
                  </label>
                  <input
                    type="text"
                    value={emailData.footer}
                    onChange={handleFooterChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                    placeholder="Enter footer text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
                <Preview {...emailData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;