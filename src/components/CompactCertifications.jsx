import React, { useState } from 'react';
import MediaThumbnails from './MediaThumbnails';

const CompactCertifications = ({ certifications = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('');
  
  // Get unique tags for filtering
  const allTags = [...new Set(certifications.flatMap(c => c.tags || []))];
  
  // Filter certifications based on selected tag
  const filteredCerts = filter 
    ? certifications.filter(cert => cert.tags?.includes(filter))
    : certifications;
  
  // Show only first 4 by default, or all if showAll is true
  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 4);
  const hasMore = filteredCerts.length > 4;

  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="compact-certifications">
      {/* Filter buttons */}
      {allTags.length > 0 && (
        <div className="cert-filters">
          <button
            onClick={() => setFilter('')}
            className={`filter-btn ${!filter ? 'active' : ''}`}
          >
            All ({certifications.length})
          </button>
          {allTags.slice(0, 6).map(tag => {
            const count = certifications.filter(c => c.tags?.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setFilter(filter === tag ? '' : tag)}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Compact grid */}
      <div className="cert-compact-grid">
        {displayedCerts.map((cert, index) => (
          <div key={index} className="cert-compact-item">
            <div className="cert-compact-header">
              {cert.logo && (
                <img src={cert.logo} alt={`${cert.name} logo`} className="cert-compact-logo" />
              )}
              <div className="cert-compact-info">
                <h4 className="cert-compact-title">{cert.name}</h4>
                <div className="cert-compact-tags">
                  {cert.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="cert-compact-tag">{tag}</span>
                  ))}
                  {cert.tags?.length > 3 && (
                    <span className="cert-compact-tag-more">+{cert.tags.length - 3}</span>
                  )}
                </div>
              </div>
              <div className="cert-compact-actions">
                <MediaThumbnails media={cert.media} maxDisplay={2} className="cert-compact-media" />
                {cert.ext && cert.ext !== '#' && (
                  <a href={cert.ext} target="_blank" rel="noreferrer" className="cert-link">
                    View
                  </a>
                )}
              </div>
            </div>
            
            {/* Expandable description */}
            <div className="cert-compact-desc">
              <p>{cert.desc.length > 120 ? `${cert.desc.substring(0, 120)}...` : cert.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show more/less controls */}
      {hasMore && (
        <div className="cert-controls">
          <button
            onClick={() => setShowAll(!showAll)}
            className="cert-toggle-btn"
          >
            {showAll ? 'Show Less' : `Show ${filteredCerts.length - 4} More`}
          </button>
          {filter && (
            <span className="cert-filter-info">
              Showing {filteredCerts.length} certifications with "{filter}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CompactCertifications;