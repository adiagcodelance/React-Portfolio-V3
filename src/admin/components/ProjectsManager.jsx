import React, { useState, useEffect } from 'react';
import { projectsApi } from '../utils/api';
import FileUpload from './FileUpload';
import { PlusIcon, EditIcon, TrashIcon, EyeIcon, EyeOffIcon, SaveIcon, CloseIcon, RocketIcon } from './Icons';

const ProjectsManager = ({ projects = [], onUpdate }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [],
    githubUrl: '',
    externalUrl: '',
    featured: false,
    isActive: true,
    media: []
  });
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      tags: [],
      githubUrl: '',
      externalUrl: '',
      featured: false,
      isActive: true,
      media: []
    });
    setTagInput('');
    setEditingProject(null);
    setIsFormOpen(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || '',
      description: project.description || '',
      tags: project.tags || [],
      githubUrl: project.githubUrl || '',
      externalUrl: project.externalUrl || '',
      featured: project.featured || false,
      isActive: project.isActive !== false,
      media: project.media || []
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in name and description');
      return;
    }

    setLoading(true);
    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id, formData);
      } else {
        await projectsApi.create(formData);
      }
      await onUpdate();
      resetForm();
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      try {
        await projectsApi.delete(project.id);
        await onUpdate();
      } catch (error) {
        alert('Failed to delete project: ' + error.message);
      }
    }
  };

  const handleToggleActive = async (project) => {
    try {
      await projectsApi.toggle(project.id);
      await onUpdate();
    } catch (error) {
      alert('Failed to toggle project: ' + error.message);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      await projectsApi.toggleFeatured(project.id);
      await onUpdate();
    } catch (error) {
      alert('Failed to toggle featured: ' + error.message);
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div>
      {/* Header */}
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
            Projects Management
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Manage your portfolio projects and showcases ({projects.length} total)
          </p>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#d97706',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <PlusIcon size={16} />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              position: 'relative'
            }}
          >
            {/* Status badges */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '4px'
            }}>
              {project.featured && (
                <span style={{
                  padding: '2px 6px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  fontSize: '10px',
                  fontWeight: '600',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Featured
                </span>
              )}
              <span style={{
                padding: '2px 6px',
                backgroundColor: project.isActive ? '#d1fae5' : '#fee2e2',
                color: project.isActive ? '#065f46' : '#991b1b',
                fontSize: '10px',
                fontWeight: '600',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                {project.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                paddingRight: '80px'
              }}>
                {project.name}
              </h3>
              
              <p style={{
                margin: '0 0 12px 0',
                color: '#6b7280',
                fontSize: '14px',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        fontSize: '12px',
                        borderRadius: '12px',
                        marginRight: '6px',
                        marginBottom: '4px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      fontStyle: 'italic'
                    }}>
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px'
              }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f9fafb',
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '12px',
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    GitHub
                  </a>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f9fafb',
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '12px',
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    Demo
                  </a>
                )}
              </div>

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(project)}
                    style={{
                      padding: '6px 8px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <EditIcon size={12} />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleToggleActive(project)}
                    style={{
                      padding: '6px 8px',
                      backgroundColor: project.isActive ? '#ef4444' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {project.isActive ? <EyeOffIcon size={12} /> : <EyeIcon size={12} />}
                    {project.isActive ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    style={{
                      padding: '6px 8px',
                      backgroundColor: project.featured ? '#f59e0b' : '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    {project.featured ? 'Featured' : 'Feature'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(project)}
                    style={{
                      padding: '6px 8px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <TrashIcon size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {projects.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '48px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px dashed #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <RocketIcon size={48} style={{ color: '#6b7280' }} />
            </div>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              No projects yet
            </h3>
            <p style={{
              margin: '0 0 16px 0',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Start by adding your first project to showcase your work.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d97706',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Add Your First Project
            </button>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isFormOpen && (
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
            padding: '24px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827'
              }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={resetForm}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  color: '#6b7280'
                }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Project Name */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Enter project name"
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Describe your project"
                />
              </div>

              {/* GitHub URL */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="https://github.com/username/repository"
                />
              </div>

              {/* External URL */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, externalUrl: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="https://your-project-demo.com"
                />
              </div>

              {/* Tags */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Tags
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={addTag}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Type a tag and press Enter"
                />
                {formData.tags.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          backgroundColor: '#eff6ff',
                          color: '#1e40af',
                          fontSize: '12px',
                          borderRadius: '12px',
                          marginRight: '6px',
                          marginBottom: '6px',
                          gap: '4px'
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#1e40af',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '14px'
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Media Upload */}
              <FileUpload
                title="Project Media"
                onFilesUploaded={(files) => setFormData(prev => ({ ...prev, media: files }))}
                existingFiles={formData.media}
                multiple={true}
                accept="image/*,application/pdf"
                maxFiles={10}
              />

              {/* Options */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    style={{ margin: 0 }}
                  />
                  Featured Project
                </label>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    style={{ margin: 0 }}
                  />
                  Active (Visible on site)
                </label>
              </div>

              {/* Form Actions */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
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
                    padding: '10px 16px',
                    backgroundColor: loading ? '#9ca3af' : '#d97706',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <SaveIcon size={16} />
                  {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
