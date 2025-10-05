import React, { useState, useRef } from 'react';
import { uploadApi } from '../utils/api';

const FileUpload = ({ 
  onFilesUploaded, 
  existingFiles = [], 
  multiple = false,
  accept = "image/*",
  maxFiles = 5,
  title = "Upload Files"
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState(existingFiles);
  const fileInputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const filesArray = Array.from(fileList);
    
    if (!multiple && filesArray.length > 1) {
      alert('Only one file is allowed');
      return;
    }
    
    if (multiple && files.length + filesArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = filesArray.map(async (file) => {
        const response = await uploadApi.uploadImage(file);
        return {
          name: file.name,
          url: response.url,
          type: file.type,
          size: file.size
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const newFiles = multiple ? [...files, ...uploadedFiles] : uploadedFiles;
      
      setFiles(newFiles);
      onFilesUploaded(newFiles);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ 
        color: 'var(--headline, #111827)', 
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        {title}
      </h4>
      
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragActive ? '#d97706' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: dragActive ? 'rgba(217, 119, 6, 0.1)' : 'var(--surface, #f9fafb)',
          transition: 'all 0.3s ease',
          marginBottom: '15px'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <div>
            <div style={{ 
              fontSize: '24px', 
              marginBottom: '10px',
              color: 'var(--accent, #d97706)'
            }}>⏳</div>
            <p style={{ color: 'var(--text, #374151)', margin: 0 }}>
              Uploading...
            </p>
          </div>
        ) : (
          <div>
            <div style={{ 
              fontSize: '24px', 
              marginBottom: '10px',
              color: 'var(--text-light, #6b7280)'
            }}>📁</div>
            <p style={{ 
              color: 'var(--text, #374151)', 
              margin: '0 0 5px 0',
              fontWeight: '500'
            }}>
              {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p style={{ 
              color: 'var(--text-light, #6b7280)', 
              margin: 0,
              fontSize: '14px'
            }}>
              {accept.includes('image') ? 'Images only' : 'Files'} • Max {maxFiles} files
            </p>
          </div>
        )}
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div>
          <h5 style={{ 
            color: 'var(--headline, #111827)', 
            marginBottom: '10px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Uploaded Files ({files.length})
          </h5>
          <div style={{ 
            display: 'grid', 
            gap: '10px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
          }}>
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid var(--border, #e5e7eb)',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--surface, #f9fafb)',
                  position: 'relative'
                }}
              >
                {file.type?.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '8px'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: 'var(--border, #e5e7eb)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                    fontSize: '24px'
                  }}>
                    📄
                  </div>
                )}
                
                <p style={{ 
                  margin: '0 0 4px 0',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--headline, #111827)',
                  wordBreak: 'break-word'
                }}>
                  {file.name}
                </p>
                
                {file.size && (
                  <p style={{ 
                    margin: '0 0 8px 0',
                    fontSize: '12px',
                    color: 'var(--text-light, #6b7280)'
                  }}>
                    {formatFileSize(file.size)}
                  </p>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(220, 53, 69, 0.9)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;