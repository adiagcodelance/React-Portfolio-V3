const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Make public API request (no auth needed)
const makeRequest = async (url) => {
  try {
    const response = await fetch(`${API_BASE}${url}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    // Return empty array as fallback
    return [];
  }
};

// Public API endpoints
export const api = {
  // Get all active experiences
  getExperiences: () => makeRequest('/experience'),
  
  // Get all active projects
  getProjects: () => makeRequest('/projects'),
  
  // Get featured projects only
  getFeaturedProjects: () => makeRequest('/projects/featured'),
  
  // Get all active certifications
  getCertifications: () => makeRequest('/certifications'),
};