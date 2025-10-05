import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, experienceApi, projectsApi, certificationsApi } from '../utils/api';
import ExperienceManager from '../components/ExperienceManager';
import ProjectsManager from '../components/ProjectsManager';
import CertificationsManager from '../components/CertificationsManager';
import BulkOperationsManager from '../components/BulkOperationsManager';

const ModernDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #d97706',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ color: '#374151', fontSize: '16px', fontWeight: '500' }}>Loading...</span>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'experience', label: 'Experience', icon: '💼' },
    { key: 'projects', label: 'Projects', icon: '🚀' },
    { key: 'certifications', label: 'Certifications', icon: '🏆' },
    { key: 'bulk', label: 'Backup & Import', icon: '📦' },
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Logo Section */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#d97706',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px'
          }}>
            ⚡
          </div>
          {sidebarOpen && (
            <h1 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              color: '#111827'
            }}>
              Portfolio Admin
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                width: '100%',
                padding: sidebarOpen ? '12px 24px' : '12px',
                border: 'none',
                backgroundColor: activeTab === item.key ? '#fef3e2' : 'transparent',
                color: activeTab === item.key ? '#d97706' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                fontWeight: activeTab === item.key ? '600' : '500',
                borderRadius: 0,
                borderLeft: activeTab === item.key ? '3px solid #d97706' : '3px solid transparent',
                transition: 'all 0.2s ease',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#e5e7eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#6b7280'
          }}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          {sidebarOpen && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#111827',
                truncate: true
              }}>
                {user?.username}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#6b7280'
              }}>
                Administrator
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: '#6b7280'
              }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827'
            }}>
              {sidebarItems.find(item => item.key === activeTab)?.label}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f9fafb',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>🌐</span>
              View Site
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc2626',
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
              <span>🚪</span>
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={{
          flex: 1,
          overflow: 'auto',
          padding: '32px'
        }}>
          {activeTab === 'overview' && (
            <OverviewContent 
              experiences={experiences}
              projects={projects}
              certifications={certifications}
              setActiveTab={setActiveTab}
            />
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
        </main>
      </div>
    </div>
  );
};

// Overview Dashboard Content
const OverviewContent = ({ experiences, projects, certifications, setActiveTab }) => {
  const stats = [
    {
      title: 'Experience Entries',
      value: experiences.length,
      subtitle: `${experiences.filter(e => e.isActive).length} active`,
      color: '#3b82f6',
      icon: '💼',
      onClick: () => setActiveTab('experience')
    },
    {
      title: 'Projects',
      value: projects.length,
      subtitle: `${projects.filter(p => p.featured).length} featured, ${projects.filter(p => p.isActive).length} active`,
      color: '#10b981',
      icon: '🚀',
      onClick: () => setActiveTab('projects')
    },
    {
      title: 'Certifications',
      value: certifications.length,
      subtitle: `${certifications.filter(c => c.isActive).length} active`,
      color: '#f59e0b',
      icon: '🏆',
      onClick: () => setActiveTab('certifications')
    }
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Welcome Back! 👋
        </h1>
        <p style={{
          margin: 0,
          fontSize: '16px',
          opacity: 0.9
        }}>
          Here's an overview of your portfolio content. Manage your experience, projects, and certifications from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '700',
                color: stat.color
              }}>
                {stat.value}
              </div>
            </div>
            <h3 style={{
              margin: '0 0 4px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827'
            }}>
              {stat.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#6b7280'
            }}>
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {[
            { label: 'Add Experience', icon: '➕', color: '#3b82f6', action: () => setActiveTab('experience') },
            { label: 'Add Project', icon: '🆕', color: '#10b981', action: () => setActiveTab('projects') },
            { label: 'Add Certification', icon: '🎯', color: '#f59e0b', action: () => setActiveTab('certifications') },
            { label: 'Backup Data', icon: '💾', color: '#8b5cf6', action: () => setActiveTab('bulk') }
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                padding: '16px',
                backgroundColor: `${action.color}10`,
                border: `1px solid ${action.color}30`,
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                fontWeight: '500',
                color: action.color,
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '18px' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;