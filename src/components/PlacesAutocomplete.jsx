import { useState, useEffect, useRef } from 'react';
import { fetchPlaces } from '../services/api';

export const PlacesAutocomplete = ({ value, onChange, placeholder, label, required }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    onChange(input);

    if (input.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      console.log('🔍 Fetching places for:', input);
      const data = await fetchPlaces(input);
      
      console.log('📍 Received data:', data);
      
      if (data && data.features && Array.isArray(data.features)) {
        setSuggestions(data.features);
        setShowSuggestions(data.features.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('❌ Error in autocomplete:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlace = (place) => {
    const placeName = place.properties?.city || 
                      place.properties?.name || 
                      place.properties?.formatted;
    onChange(placeName);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        
        <svg 
          className="absolute left-3 top-4 h-5 w-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>

        {loading && (
          <div className="absolute right-3 top-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => {
            const placeName = place.properties?.city || 
                             place.properties?.name || 
                             place.properties?.formatted;
            const country = place.properties?.country;
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectPlace(place)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <svg 
                    className="h-4 w-4 text-gray-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">{placeName}</p>
                    {country && (
                      <p className="text-xs text-gray-500">{country}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && !loading && value.trim().length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
          No locations found. Try typing a city name.
        </div>
      )}
    </div>
  );
};