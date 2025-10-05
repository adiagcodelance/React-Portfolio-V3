import React, { useState } from 'react';

const BulkOperationsManager = ({ onUpdate }) => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      // This would typically call your API to export all data
      // For now, we'll just show a placeholder
      setTimeout(() => {
        alert('Export functionality will be implemented with the next backend deployment.');
        setExporting(false);
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    try {
      // This would typically call your API to import data
      // For now, we'll just show a placeholder
      setTimeout(() => {
        alert('Import functionality will be implemented with the next backend deployment.');
        setImporting(false);
        event.target.value = ''; // Reset file input
      }, 1000);
    } catch (error) {
      console.error('Import failed:', error);
      setImporting(false);
      event.target.value = ''; // Reset file input
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
            Backup & Import
          </h2>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Export your data for backup or import data from files
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {/* Export Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📦
            </div>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              Export Data
            </h3>
          </div>
          
          <p style={{
            margin: '0 0 20px 0',
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Download all your portfolio data as a JSON file. This includes experiences, projects, certifications, and media files.
          </p>
          
          <button
            onClick={handleExport}
            disabled={exporting}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: exporting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: exporting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            {exporting ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Exporting...
              </>
            ) : (
              <>
                <span>💾</span>
                Export All Data
              </>
            )}
          </button>
        </div>

        {/* Import Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📥
            </div>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              Import Data
            </h3>
          </div>
          
          <p style={{
            margin: '0 0 20px 0',
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Upload a JSON file to import portfolio data. This will merge with existing data or replace it entirely.
          </p>
          
          <label style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: importing ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: importing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing}
              style={{ display: 'none' }}
            />
            {importing ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Importing...
              </>
            ) : (
              <>
                <span>📁</span>
                Choose File to Import
              </>
            )}
          </label>
        </div>

        {/* Backup Info Card */}
        <div style={{
          backgroundColor: '#fefce8',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #fef3c7',
          gridColumn: 'span 2'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#fbbf24',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ⚠️
            </div>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#92400e'
            }}>
              Backup Recommendations
            </h3>
          </div>
          
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#92400e',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <li>Export your data regularly to prevent data loss</li>
            <li>Keep backups in multiple locations (cloud storage, local drives)</li>
            <li>Test your backups by importing them into a test environment</li>
            <li>Media files (images, documents) should be backed up separately</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BulkOperationsManager;