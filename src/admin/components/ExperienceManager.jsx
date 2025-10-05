import React, { useState } from 'react';
import { experienceApi } from '../utils/api';
import FileUpload from './FileUpload';

const ExperienceManager = ({ experiences, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceApi.delete(id);
        onUpdate();
      } catch (error) {
        alert('Failed to delete experience: ' + error.message);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await experienceApi.toggle(id);
      onUpdate();
    } catch (error) {
      alert('Failed to toggle experience: ' + error.message);
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
            Experience Management
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Manage your work experience and professional history
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
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
          <span>➕</span>
          Add Experience
        </button>
      </div>

      {showForm && (
        <ExperienceForm
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
        {experiences.map((exp) => (
          <div key={exp.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            opacity: exp.isActive ? 1 : 0.7,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1, marginRight: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={exp.company}
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
                      margin: '0 0 4px 0',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {exp.title}
                    </h3>
                    <p style={{ 
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      color: '#3b82f6',
                      fontWeight: '500'
                    }}>
                      {exp.company}
                    </p>
                    <p style={{ 
                      margin: 0,
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {exp.dates}
                    </p>
                  </div>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <ul style={{ 
                      margin: 0,
                      paddingLeft: '20px',
                      color: '#374151'
                    }}>
                      {exp.bullets.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{bullet}</li>
                      ))}
                      {exp.bullets.length > 3 && (
                        <li style={{ color: '#6b7280', fontStyle: 'italic' }}>
                          ...and {exp.bullets.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {exp.media && exp.media.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Media ({exp.media.length})
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                      gap: '8px',
                      maxWidth: '300px'
                    }}>
                      {exp.media.slice(0, 4).map((media, idx) => (
                        <img
                          key={idx}
                          src={media.url}
                          alt={media.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                      ))}
                      {exp.media.length > 4 && (
                        <div style={{
                          width: '60px',
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
                          +{exp.media.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {exp.tags && exp.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#f0f9ff',
                        color: '#0369a1',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        border: '1px solid #bae6fd'
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
                    setEditingItem(exp);
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
                  onClick={() => handleToggle(exp.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: exp.isActive ? '#f59e0b' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {exp.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
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

        {experiences.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            border: '2px dashed #e5e7eb',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              No experience entries yet
            </h3>
            <p style={{
              margin: '0 0 24px 0',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Add your first work experience to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Experience Form Component
const ExperienceForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    company: item?.company || '',
    title: item?.title || '',
    dates: item?.dates || '',
    logo: item?.logo || '',
    bullets: item?.bullets || [''],
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
        bullets: formData.bullets.filter(bullet => bullet.trim() !== ''),
        tags: formData.tags
      };

      if (item?.id) {
        await experienceApi.update(item.id, dataToSend);
      } else {
        await experienceApi.create(dataToSend);
      }
      onSave();
    } catch (error) {
      alert('Failed to save experience: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBullet = () => {
    setFormData({
      ...formData,
      bullets: [...formData.bullets, '']
    });
  };

  const updateBullet = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({
      ...formData,
      bullets: newBullets
    });
  };

  const removeBullet = (index) => {
    setFormData({
      ...formData,
      bullets: formData.bullets.filter((_, i) => i !== index)
    });
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
          {item ? 'Edit Experience' : 'Add New Experience'}
        </h3>

        <form onSubmit={handleSubmit}>
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
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
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
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
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
                Dates *
              </label>
              <input
                type="text"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                placeholder="e.g., Jun 2024 – Present"
                required
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
          </div>

          {/* Media Upload */}
          <FileUpload
            title="Experience Media"
            onFilesUploaded={handleMediaUpload}
            existingFiles={formData.media}
            multiple={true}
            maxFiles={10}
            accept="image/*,application/pdf"
          />

          {/* Bullets */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Key Accomplishments
            </label>
            {formData.bullets.map((bullet, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateBullet(index, e.target.value)}
                  placeholder="Describe an accomplishment or responsibility"
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeBullet(index)}
                  style={{
                    padding: '12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBullet}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              + Add Bullet Point
            </button>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Skills & Technologies
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
                  backgroundColor: '#f0f9ff',
                  color: '#0369a1',
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
                      color: '#0369a1',
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
                placeholder="Add a skill or technology"
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
                  backgroundColor: '#3b82f6',
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
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {loading ? 'Saving...' : (item ? 'Update Experience' : 'Create Experience')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceManager;