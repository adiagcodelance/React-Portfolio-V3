import React from 'react';

const MediaThumbnails = ({ media = [], maxDisplay = 3, className = "" }) => {
  if (!media || media.length === 0) return null;

  const displayMedia = media.slice(0, maxDisplay);
  const remainingCount = media.length - maxDisplay;

  return (
    <div className={`media-thumbnails ${className}`}>
      {displayMedia.map((item, index) => (
        <div key={index} className="media-thumbnail">
          {item.type && item.type.startsWith('image/') ? (
            <img
              src={item.url}
              alt={item.originalName || `Media ${index + 1}`}
              className="media-thumb-image"
              loading="lazy"
            />
          ) : item.type === 'application/pdf' || item.url?.endsWith('.pdf') ? (
            <div className="media-thumb-pdf">
              <div className="pdf-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <path d="M9 13h2v4H9z"/>
                  <path d="M13 13h1.5a1.5 1.5 0 0 1 0 3H13"/>
                </svg>
              </div>
              <span className="pdf-label">PDF</span>
            </div>
          ) : (
            <div className="media-thumb-file">
              <div className="file-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="media-thumbnail media-more">
          <span className="more-count">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};

export default MediaThumbnails;