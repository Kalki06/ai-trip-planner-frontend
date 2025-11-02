import axios from 'axios';

// Define API_BASE_URL - this is the critical fix
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔗 API_BASE_URL:', API_BASE_URL);
console.log('📦 All env variables:', import.meta.env);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Generate trip itinerary
export const generateTrip = async (tripData) => {
  try {
    console.log('📡 Generating trip...');
    console.log('🌐 Backend URL:', `${API_BASE_URL}/api/generate-trip`);
    console.log('📝 Trip data:', tripData);
    
    const response = await api.post('/api/generate-trip', tripData);
    
    console.log('✅ Trip generated successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error generating trip:', error);
    console.error('Response:', error.response?.data);
    throw error;
  }
};

// Fetch places autocomplete from Geoapify
export const fetchPlaces = async (input) => {
  try {
    if (!input || input.trim().length === 0) {
      return { features: [] };
    }

    console.log('🔍 Searching places for:', input);
    console.log('🌐 Request URL:', `${API_BASE_URL}/api/places-autocomplete?input=${input}`);
    
    const response = await api.get('/api/places-autocomplete', {
      params: { input: input.trim() }
    });
    
    console.log('✅ Places response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching places:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    // Return empty array instead of throwing error
    return { features: [] };
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

export default api;