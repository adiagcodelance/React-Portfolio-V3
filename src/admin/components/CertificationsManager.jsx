import React, { useState } from 'react';
import { certificationsApi } from '../utils/api';
import FileUpload from './FileUpload';

const CertificationsManager = ({ certifications, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await certificationsApi.delete(id);
        onUpdate();
      } catch (error) {
        alert('Failed to delete certification: ' + error.message);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await certificationsApi.toggle(id);
      onUpdate();
    } catch (error) {
      alert('Failed to toggle certification: ' + error.message);
    }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px' 
      }}>
        <div>
          <h2 style={{
            margin: '0 0 8px 0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#111827'
          }}>
            Certification Management
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Manage your professional certifications and achievements
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🏆</span>
          Add Certification
        </button>
      </div>

      {showForm && (
        <CertificationForm
          item={editingItem}
          onSave={() => {
            setShowForm(false);
            setEditingItem(null);
            onUpdate();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {certifications.map((cert) => (
          <div key={cert.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            opacity: cert.isActive ? 1 : 0.7,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1, marginRight: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  {cert.logo && (
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <div>
                    <h3 style={{ 
                      margin: '0 0 8px 0',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {cert.name}
                    </h3>
                    {cert.externalUrl && (
                      <a
                        href={cert.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>

                <p style={{
                  margin: '0 0 16px 0',
                  color: '#374151',
                  lineHeight: '1.6',
                  fontSize: '14px'
                }}>
                  {cert.description.length > 200 
                    ? `${cert.description.substring(0, 200)}...` 
                    : cert.description
                  }
                </p>

                {cert.media && cert.media.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Certificate Media ({cert.media.length})
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '8px',
                      maxWidth: '400px'
                    }}>
                      {cert.media.slice(0, 5).map((media, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <img
                            src={media.url}
                            alt={media.name}
                            style={{
                              width: '80px',
                              height: '60px',
                              borderRadius: '6px',
                              objectFit: 'cover',
                              border: '1px solid #e5e7eb',
                              cursor: 'pointer'
                            }}
                            onClick={() => window.open(media.url, '_blank')}
                          />
                          {media.type?.includes('pdf') && (
                            <div style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              fontSize: '10px',
                              padding: '2px 4px',
                              borderRadius: '3px'
                            }}>
                              PDF
                            </div>
                          )}
                        </div>
                      ))}
                      {cert.media.length > 5 && (
                        <div style={{
                          width: '80px',
                          height: '60px',
                          borderRadius: '6px',
                          backgroundColor: '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: '#6b7280',
                          border: '1px solid #e5e7eb'
                        }}>
                          +{cert.media.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {cert.tags && cert.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cert.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#fef3e2',
                        color: '#d97706',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        border: '1px solid #fed7aa'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                <button
                  onClick={() => {
                    setEditingItem(cert);
                    setShowForm(true);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(cert.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: cert.isActive ? '#f59e0b' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {cert.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            border: '2px dashed #e5e7eb',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              No certifications yet
            </h3>
            <p style={{
              margin: '0 0 24px 0',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Add your first professional certification to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Add Your First Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Certification Form Component
const CertificationForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    logo: item?.logo || '',
    externalUrl: item?.externalUrl || '',
    tags: item?.tags || [],
    media: item?.media || [],
    order: item?.order || 0,
    isActive: item?.isActive !== undefined ? item.isActive : true
  });
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        tags: formData.tags
      };

      if (item?.id) {
        await certificationsApi.update(item.id, dataToSend);
      } else {
        await certificationsApi.create(dataToSend);
      }
      onSave();
    } catch (error) {
      alert('Failed to save certification: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleMediaUpload = (uploadedFiles) => {
    setFormData({
      ...formData,
      media: uploadedFiles
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{
          margin: '0 0 24px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#111827'
        }}>
          {item ? 'Edit Certification' : 'Add New Certification'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Certification Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., AWS Certified Solutions Architect"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Describe what this certification demonstrates and its requirements..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical',
                minHeight: '100px'
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Logo URL
              </label>
              <input
                type="url"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://example.com/logo.png"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Certificate URL
              </label>
              <input
                type="url"
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                placeholder="https://verify.certificate.com/xyz"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Media Upload */}
          <FileUpload
            title="Certificate Media"
            onFilesUploaded={handleMediaUpload}
            existingFiles={formData.media}
            multiple={true}
            maxFiles={8}
            accept="image/*,application/pdf"
          />

          {/* Tags */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Skills & Categories
            </label>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '8px',
              flexWrap: 'wrap'
            }}>
              {formData.tags.map((tag, index) => (
                <span key={index} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#fef3e2',
                  color: '#d97706',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#d97706',
                      cursor: 'pointer',
                      padding: '0',
                      fontSize: '12px'
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a skill or category"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <button
                type="button"
                onClick={addTag}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Status */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ marginRight: '4px' }}
              />
              Active (visible on portfolio)
            </label>
          </div>

          {/* Form Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '20px'
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {loading ? 'Saving...' : (item ? 'Update Certification' : 'Create Certification')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationsManager;