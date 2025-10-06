const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('adminToken');

// Set auth token in localStorage
const setToken = (token) => localStorage.setItem('adminToken', token);

// Remove auth token from localStorage
const removeToken = () => localStorage.removeItem('adminToken');

// Check if user is authenticated
const isAuthenticated = () => !!getToken();

// Make authenticated request
const makeRequest = async (url, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${url}`, config);
  
  // Handle 401 (unauthorized)
  if (response.status === 401) {
    removeToken();
    window.location.href = '/admin/login';
    return null;
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
};

// Auth API
export const auth = {
  login: async (credentials) => {
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response?.token) {
      setToken(response.token);
      // Notify the app that auth state changed
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    }
    
    return response;
  },
  
  logout: () => {
    removeToken();
    // Notify the app that auth state changed
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    // Return to public home page on logout
    window.location.href = '/';
  },
  
  getUser: () => makeRequest('/auth/me'),
};

// Experience API
export const experienceApi = {
  getAll: () => makeRequest('/experience'),
  getAllAdmin: () => makeRequest('/experience/admin/all'),
  getById: (id) => makeRequest(`/experience/${id}`),
  create: (data) => makeRequest('/experience', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => makeRequest(`/experience/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => makeRequest(`/experience/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id) => makeRequest(`/experience/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// Projects API
export const projectsApi = {
  getAll: () => makeRequest('/projects'),
  getAllAdmin: () => makeRequest('/projects/admin/all'),
  getFeatured: () => makeRequest('/projects/featured'),
  getById: (id) => makeRequest(`/projects/${id}`),
  create: (data) => makeRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => makeRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => makeRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id) => makeRequest(`/projects/${id}/toggle`, {
    method: 'PATCH',
  }),
  toggleFeatured: (id) => makeRequest(`/projects/${id}/featured`, {
    method: 'PATCH',
  }),
};

// Certifications API
export const certificationsApi = {
  getAll: () => makeRequest('/certifications'),
  getAllAdmin: () => makeRequest('/certifications/admin/all'),
  getById: (id) => makeRequest(`/certifications/${id}`),
  create: (data) => makeRequest('/certifications', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => makeRequest(`/certifications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => makeRequest(`/certifications/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id) => makeRequest(`/certifications/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// Upload API
export const uploadApi = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = getToken();
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return response.json();
  },
  
  uploadFile: async (file) => {
    const token = getToken();
    
    // Try multipart upload first
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.log('Multipart upload failed, trying base64:', error.message);
    }
    
    // Fallback to base64 upload
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1]; // Remove data:type;base64, prefix
          
          const response = await fetch(`${API_BASE}/upload-base64`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data,
              fileType: file.type
            }),
          });
          
          if (!response.ok) {
            throw new Error('Base64 upload failed');
          }
          
          resolve(response.json());
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },
};

// Bulk operations API
export const bulkApi = {
  exportData: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/bulk/export`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Export failed');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
  
  importData: (data, replaceExisting = false) => makeRequest('/bulk/import', {
    method: 'POST',
    body: JSON.stringify({ data, replaceExisting }),
  }),
  
  clearAllData: () => makeRequest('/bulk/clear', {
    method: 'POST',
    body: JSON.stringify({ confirm: 'DELETE_ALL_DATA' }),
  }),
};

export { isAuthenticated, removeToken };
