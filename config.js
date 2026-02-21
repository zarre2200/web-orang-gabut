/**
 * Configuration file for multi-device access
 * Automatically detects if running locally or on a network
 */

// Detect server URL based on current page origin or environment
function getServerURL() {
  // If we're already on a server (not file://), use the same origin
  if (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'file://') {
    const baseURL = window.location.origin;
    console.log('[CONFIG] Using same-origin server:', baseURL);
    return baseURL;
  }
  
  // Fallback for local development
  const serverURL = 'http://localhost:3000';
  console.log('[CONFIG] Using fallback server:', serverURL);
  return serverURL;
}

/**
 * API configuration
 * Use this object to make API calls
 */
const API = {
  baseURL: typeof window !== 'undefined' ? getServerURL() : 'http://localhost:3000',
  
  // All API endpoints
  endpoints: {
    posts: '/api/posts',
    health: '/api/health'
  },
  
  // Helper method to build full URLs
  url: function(endpoint) {
    return this.baseURL + endpoint;
  },
  
  // Shorthand methods for common operations
  async getPosts() {
    const response = await fetch(this.url('/api/posts'));
    if (!response.ok) throw new Error('Failed to fetch posts: ' + response.statusText);
    return response.json();
  },
  
  async createPost(data) {
    const response = await fetch(this.url('/api/posts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create post: ' + response.statusText);
    return response.json();
  },
  
  async updatePost(id, data) {
    const response = await fetch(this.url('/api/posts/' + id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update post: ' + response.statusText);
    return response.json();
  },
  
  async deletePost(id) {
    const response = await fetch(this.url('/api/posts/' + id), {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete post: ' + response.statusText);
    return response.json();
  },
  
  async checkHealth() {
    const response = await fetch(this.url('/api/health'));
    if (!response.ok) throw new Error('Server not responding');
    return response.json();
  }
};

// Export for Node.js (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getServerURL, API };
}
