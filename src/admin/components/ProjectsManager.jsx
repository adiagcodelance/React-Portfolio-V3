import React from 'react';

const ProjectsManager = ({ projects, onUpdate }) => {
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
            Projects Management
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Manage your portfolio projects and showcases
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        border: '2px dashed #e5e7eb',
        borderRadius: '12px',
        padding: '48px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>
          Projects Manager Coming Soon
        </h3>
        <p style={{
          margin: '0',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          This feature will be enhanced with media upload support in the next update.
        </p>
      </div>
    </div>
  );
};

export default ProjectsManager;