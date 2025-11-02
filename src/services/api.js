import axios from 'axios';

// Get API URL from environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔗 API Base URL:', API_BASE_URL);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds
});

// Generate trip itinerary
export const generateTrip = async (tripData) => {
  try {
    console.log('📡 Sending request to:', `${API_BASE_URL}/api/generate-trip`);
    console.log('📝 Trip data:', tripData);
    
    const response = await api.post('/api/generate-trip', tripData);
    
    console.log('✅ Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error generating trip:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch places autocomplete
export const fetchPlaces = async (input) => {
  try {
    console.log('🔍 Fetching places for:', input);
    console.log('📡 Request URL:', `${API_BASE_URL}/api/places-autocomplete?input=${input}`);
    
    const response = await api.get('/api/places-autocomplete', {
      params: { input }
    });
    
    console.log('✅ Places found:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching places:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    console.log('✅ Backend health:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    throw error;
  }
};

export default api