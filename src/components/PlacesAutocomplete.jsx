import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { getPlacesAutocomplete } from '../services/api';

export const PlacesAutocomplete = ({ value, onChange, placeholder, required }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getPlacesAutocomplete(inputValue);
        
        // Parse Geoapify response
        const places = response.features?.map(feature => ({
          name: feature.properties.formatted || feature.properties.name,
          city: feature.properties.city,
          country: feature.properties.country,
          full: `${feature.properties.city || feature.properties.name}, ${feature.properties.country}`
        })) || [];

        setSuggestions(places);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching places:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce - wait 300ms after user stops typing
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.full);
    onChange(suggestion.full);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">
          Where do you want to go? {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Icon */}
          <MapPin 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          
          {/* Loading indicator */}
          {loading && (
            <Loader2 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" 
              size={20} 
            />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <MapPin size={18} className="text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{suggestion.city || suggestion.name}</div>
                <div className="text-sm text-gray-500">{suggestion.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && !loading && inputValue.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No locations found. Try typing a city name.
        </div>
      )}
    </div>
  );
};