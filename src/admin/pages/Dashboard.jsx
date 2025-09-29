import React, { useState, useEffect } from 'react';
import { auth, experienceApi, projectsApi, certificationsApi, bulkApi } from '../utils/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, expRes, projRes, certRes] = await Promise.all([
        auth.getUser(),
        experienceApi.getAllAdmin(),
        projectsApi.getAllAdmin(),
        certificationsApi.getAllAdmin(),
      ]);
      
      setUser(userRes.user);
      setExperiences(expRes);
      setProjects(projRes);
      setCertifications(certRes);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : '#333',
    border: '1px solid #ddd',
    cursor: 'pointer',
    borderRadius: '0',
    fontSize: '0.9rem'
  });

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Portfolio Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex' }}>
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'experience', label: 'Experience' },
            { key: 'projects', label: 'Projects' },
            { key: 'certifications', label: 'Certifications' },
            { key: 'bulk', label: 'Backup & Import' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={tabStyle(activeTab === tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '2rem' }}>
        {activeTab === 'overview' && (
          <div>
            <h2>Dashboard Overview</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0, color: '#007bff' }}>Experience</h3>
                <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
                  {experiences.length}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  Active: {experiences.filter(e => e.isActive).length}
                </p>
              </div>
              
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0, color: '#28a745' }}>Projects</h3>
                <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
                  {projects.length}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  Featured: {projects.filter(p => p.featured).length} | 
                  Active: {projects.filter(p => p.isActive).length}
                </p>
              </div>
              
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0, color: '#ffc107' }}>Certifications</h3>
                <p style={{ fontSize: '2rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
                  {certifications.length}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  Active: {certifications.filter(c => c.isActive).length}
                </p>
              </div>
            </div>

            <div style={{ ...cardStyle, marginTop: '2rem' }}>
              <h3>Quick Actions</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('experience')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Manage Experience
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Manage Projects
                </button>
                <button
                  onClick={() => setActiveTab('certifications')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Manage Certifications
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <ExperienceManager experiences={experiences} onUpdate={loadData} />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager projects={projects} onUpdate={loadData} />
        )}

        {activeTab === 'certifications' && (
          <CertificationsManager certifications={certifications} onUpdate={loadData} />
        )}

        {activeTab === 'bulk' && (
          <BulkOperationsManager onUpdate={loadData} />
        )}
      </div>
    </div>
  );
};

// Simple Experience Manager Component
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Experience Management</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Experience
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

      <div style={{ display: 'grid', gap: '1rem' }}>
        {experiences.map((exp) => (
          <div key={exp.id} style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            opacity: exp.isActive ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{exp.title} at {exp.company}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{exp.dates}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={{ marginTop: '0.5rem' }}>
                    {exp.bullets.slice(0, 2).map((bullet, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{bullet}</li>
                    ))}
                    {exp.bullets.length > 2 && <li>...and {exp.bullets.length - 2} more</li>}
                  </ul>
                )}
                {exp.tags && exp.tags.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#f8f9fa',
                        padding: '0.25rem 0.5rem',
                        margin: '0.25rem 0.25rem 0 0',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        border: '1px solid #ddd'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <button
                  onClick={() => {
                    setEditingItem(exp);
                    setShowForm(true);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(exp.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: exp.isActive ? '#ffc107' : '#007bff',
                    color: exp.isActive ? 'black' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {exp.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple form component for experience
const ExperienceForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    company: item?.company || '',
    title: item?.title || '',
    dates: item?.dates || '',
    logo: item?.logo || '',
    bullets: item?.bullets?.join('\n') || '',
    tags: item?.tags?.join(', ') || '',
    order: item?.order || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        bullets: formData.bullets.split('\n').filter(b => b.trim()),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (item) {
        await experienceApi.update(item.id, data);
      } else {
        await experienceApi.create(data);
      }

      onSave();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <h3>{item ? 'Edit Experience' : 'Add New Experience'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dates</label>
            <input
              type="text"
              value={formData.dates}
              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              required
              placeholder="e.g., Jan 2020 - Present"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Logo URL</label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="e.g., /company-logo.png"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Responsibilities (one per line)
          </label>
          <textarea
            value={formData.bullets}
            onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
            rows={6}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="React, JavaScript, Node.js"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Projects Manager Component
const ProjectsManager = ({ projects, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsApi.delete(id);
        onUpdate();
      } catch (error) {
        alert('Failed to delete project: ' + error.message);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await projectsApi.toggle(id);
      onUpdate();
    } catch (error) {
      alert('Failed to toggle project: ' + error.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await projectsApi.toggleFeatured(id);
      onUpdate();
    } catch (error) {
      alert('Failed to toggle featured status: ' + error.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Projects Management</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
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

      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.map((project) => (
          <div key={project.id} style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            opacity: project.isActive ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{project.name}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{project.description}</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {project.featured && (
                    <span style={{
                      backgroundColor: '#ffc107',
                      color: 'black',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>★ Featured</span>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                       style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'none' }}>GitHub</a>
                  )}
                  {project.externalUrl && (
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" 
                       style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'none' }}>Live Demo</a>
                  )}
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#f8f9fa',
                        padding: '0.25rem 0.5rem',
                        margin: '0.25rem 0.25rem 0 0',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        border: '1px solid #ddd'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <button
                  onClick={() => {
                    setEditingItem(project);
                    setShowForm(true);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: project.featured ? '#ffc107' : '#6c757d',
                    color: project.featured ? 'black' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {project.featured ? '★ Featured' : 'Feature'}
                </button>
                <button
                  onClick={() => handleToggle(project.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: project.isActive ? '#ffc107' : '#007bff',
                    color: project.isActive ? 'black' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {project.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Project Form Component
const ProjectForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    tags: item?.tags?.join(', ') || '',
    githubUrl: item?.githubUrl || '',
    externalUrl: item?.externalUrl || '',
    image: item?.image || '',
    featured: item?.featured || false,
    order: item?.order || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (item) {
        await projectsApi.update(item.id, data);
      } else {
        await projectsApi.create(data);
      }

      onSave();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <h3>{item ? 'Edit Project' : 'Add New Project'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/repo"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Live Demo URL</label>
            <input
              type="url"
              value={formData.externalUrl}
              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Technologies (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="React, JavaScript, Node.js"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              style={{ marginRight: '0.5rem' }}
            />
            <span>Featured Project (show prominently)</span>
          </label>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Certifications Management</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Add New Certification
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

      <div style={{ display: 'grid', gap: '1rem' }}>
        {certifications.map((cert) => (
          <div key={cert.id} style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            opacity: cert.isActive ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  {cert.logo && (
                    <img 
                      src={cert.logo} 
                      alt={`${cert.name} logo`} 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        objectFit: 'contain', 
                        marginRight: '0.5rem',
                        borderRadius: '4px'
                      }} 
                    />
                  )}
                  <h3 style={{ margin: 0 }}>{cert.name}</h3>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  {cert.description?.length > 150 
                    ? cert.description.substring(0, 150) + '...'
                    : cert.description
                  }
                </p>
                {cert.externalUrl && (
                  <a 
                    href={cert.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'none' }}
                  >
                    View Certificate ↗
                  </a>
                )}
                {cert.tags && cert.tags.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {cert.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        padding: '0.25rem 0.5rem',
                        margin: '0.25rem 0.25rem 0 0',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        border: '1px solid #ffeaa7'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                <button
                  onClick={() => {
                    setEditingItem(cert);
                    setShowForm(true);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(cert.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: cert.isActive ? '#ffc107' : '#007bff',
                    color: cert.isActive ? 'black' : 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {cert.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
    tags: item?.tags?.join(', ') || '',
    externalUrl: item?.externalUrl || '',
    order: item?.order || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      if (item) {
        await certificationsApi.update(item.id, data);
      } else {
        await certificationsApi.create(data);
      }

      onSave();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <h3>{item ? 'Edit Certification' : 'Add New Certification'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Certification Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Logo URL</label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Certificate URL</label>
            <input
              type="url"
              value={formData.externalUrl}
              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
              placeholder="https://verify.example.com/certificate"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={5}
            placeholder="Describe what this certification covers, skills gained, etc."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Skills/Topics (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Machine Learning, Python, SQL"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#ccc' : '#ffc107',
              color: loading ? '#666' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Bulk Operations Manager Component
const BulkOperationsManager = ({ onUpdate }) => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [replaceExisting, setReplaceExisting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await bulkApi.exportData();
    } catch (error) {
      alert('Export failed: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      setImportFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setImportPreview(data);
        } catch (error) {
          alert('Invalid JSON file');
          setImportFile(null);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid JSON file');
    }
  };

  const handleImport = async () => {
    if (!importPreview) return;
    
    const confirmMessage = replaceExisting 
      ? 'This will REPLACE ALL existing data. Are you sure?'
      : 'This will add to existing data. Continue?';
      
    if (!window.confirm(confirmMessage)) return;

    setImporting(true);
    try {
      const result = await bulkApi.importData(importPreview.data, replaceExisting);
      alert(`Import completed! Created ${result.totalItems} items.`);
      setImportFile(null);
      setImportPreview(null);
      onUpdate();
    } catch (error) {
      alert('Import failed: ' + error.message);
    } finally {
      setImporting(false);
    }
  };

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem'
  };

  return (
    <div>
      <h2>Backup & Import Data</h2>
      
      {/* Export Section */}
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: '#28a745' }}>📤 Export Portfolio Data</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Download all your portfolio data as a JSON file. This creates a complete backup 
          of your experiences, projects, and certifications.
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: exporting ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: exporting ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {exporting ? '⏳ Exporting...' : '📥 Download Backup'}
        </button>
      </div>

      {/* Import Section */}
      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: '#007bff' }}>📥 Import Portfolio Data</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Upload a JSON backup file to restore your portfolio data.
        </p>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{
              padding: '0.5rem',
              border: '2px dashed #ddd',
              borderRadius: '6px',
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>

        {importPreview && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Preview:</h4>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>Exported: {importPreview.exportDate}</p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>Version: {importPreview.version}</p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
              Content: {importPreview.counts?.experiences || 0} experiences, 
              {importPreview.counts?.projects || 0} projects, 
              {importPreview.counts?.certifications || 0} certifications
            </p>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={replaceExisting}
              onChange={(e) => setReplaceExisting(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{ fontSize: '0.9rem' }}>
              Replace existing data (⚠️ This will delete all current content)
            </span>
          </label>
        </div>

        <button
          onClick={handleImport}
          disabled={!importFile || importing}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: !importFile || importing ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: !importFile || importing ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {importing ? '⏳ Importing...' : '📤 Import Data'}
        </button>
      </div>

      {/* Danger Zone */}
      <div style={{
        ...cardStyle,
        borderColor: '#dc3545',
        backgroundColor: '#fff5f5'
      }}>
        <h3 style={{ marginTop: 0, color: '#dc3545' }}>⚠️ Danger Zone</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Permanently delete all portfolio data. This action cannot be undone.
        </p>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to DELETE ALL DATA? This cannot be undone!')) {
              if (window.confirm('Really? All experiences, projects, and certifications will be permanently deleted!')) {
                bulkApi.clearAllData()
                  .then(() => {
                    alert('All data cleared successfully');
                    onUpdate();
                  })
                  .catch(err => alert('Clear failed: ' + err.message));
              }
            }
          }}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🗑️ Clear All Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;