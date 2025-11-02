import axios from 'axios';

// Backend API URL - your Node.js server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generate trip itinerary using Gemini AI
 * @param {Object} tripData - Trip details (destination, days, budget, travelers, interests)
 * @returns {Promise} - Returns the generated itinerary
 */
export const generateTrip = async (tripData) => {
  try {
    console.log('🚀 Sending request to backend:', tripData);
    
    const response = await axios.post(`${API_BASE_URL}/generate-trip`, tripData);
    
    console.log('✅ Response received:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Error generating trip:', error);
    
    // More detailed error message
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Failed to generate trip');
    } else if (error.request) {
      // No response from server
      throw new Error('Backend server is not responding. Make sure it\'s running on http://localhost:5000');
    } else {
      // Other errors
      throw new Error('Failed to generate trip: ' + error.message);
    }
  }
};

/**
 * Get place autocomplete suggestions using Geoapify
 * @param {string} input - User's search input
 * @returns {Promise} - Returns place suggestions
 */
export const getPlacesAutocomplete = async (input) => {
  try {
    if (!input || input.length < 2) {
      return { features: [] }; // Return empty if input too short
    }
    
    console.log('🔍 Searching places for:', input);
    
    const response = await axios.get(`${API_BASE_URL}/places-autocomplete`, {
      params: { input }
    });
    
    console.log('✅ Places found:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Error fetching places:', error);
    
    // Return empty results on error instead of throwing
    return { features: [] };
  }
};

/**
 * Check if backend server is healthy and running
 * @returns {Promise} - Returns health status
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Backend is healthy:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    throw new Error('Backend server is not running');
  }
};