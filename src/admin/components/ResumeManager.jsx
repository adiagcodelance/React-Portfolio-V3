import React, { useState, useEffect } from 'react';

const ResumeManager = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    loadResumeInfo();
  }, []);

  const loadResumeInfo = async () => {
    try {
      const response = await fetch('/api/resume/info');
      const data = await response.json();
      setResumeInfo(data);
    } catch (error) {
      console.error('Failed to load resume info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadFile(file);
    } else {
      alert('Please select a PDF file');
      event.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', uploadFile);

      const response = await fetch('/api/admin/resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      alert('Resume uploaded successfully!');
      setUploadFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      // Reload resume info
      await loadResumeInfo();
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem'
  };

  if (loading) {
    return <div>Loading resume information...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Resume Management</h2>
      </div>

      {/* Current Resume Info */}
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: '#007bff' }}>📄 Current Resume</h3>
        {resumeInfo?.exists ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0.5rem 0', color: '#28a745', fontWeight: 'bold' }}>
              ✅ Resume is available
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
              <strong>Last updated:</strong> {formatDate(resumeInfo.lastModified)}
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
              <strong>File size:</strong> {formatFileSize(resumeInfo.size)}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              >
                📖 View Resume
              </a>
              <a
                href="/api/resume"
                download="Aditya_Agrawal_Resume.pdf"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              >
                📥 Download
              </a>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0.5rem 0', color: '#dc3545', fontWeight: 'bold' }}>
              ❌ No resume uploaded
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
              Upload a PDF resume to make it available on your portfolio.
            </p>
          </div>
        )}
      </div>

      {/* Upload New Resume */}
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: '#28a745' }}>📤 Upload New Resume</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          {resumeInfo?.exists 
            ? 'Upload a new PDF to replace your current resume.' 
            : 'Upload your resume as a PDF file.'}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{
              padding: '0.75rem',
              border: '2px dashed #ddd',
              borderRadius: '6px',
              width: '100%',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {uploadFile && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Selected file:</p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
              📄 {uploadFile.name}
            </p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
              Size: {formatFileSize(uploadFile.size)}
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!uploadFile || uploading}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: !uploadFile || uploading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: !uploadFile || uploading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {uploading ? '⏳ Uploading...' : '📤 Upload Resume'}
        </button>

        {resumeInfo?.exists && (
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.85rem', 
            color: '#dc3545',
            fontStyle: 'italic' 
          }}>
            ⚠️ Uploading will replace your current resume
          </p>
        )}
      </div>

      {/* Usage Info */}
      <div style={{
        ...cardStyle,
        backgroundColor: '#f8f9fa',
        borderColor: '#e9ecef'
      }}>
        <h3 style={{ marginTop: 0, color: '#495057' }}>ℹ️ How it Works</h3>
        <ul style={{ color: '#666', lineHeight: '1.6' }}>
          <li>Upload a PDF resume to make it available on your portfolio</li>
          <li>The resume link appears in the bottom right corner of your site</li>
          <li>Visitors can view or download your resume directly</li>
          <li>Only PDF files are accepted for security and compatibility</li>
          <li>Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeManager;