import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripForm } from '../components/TripForm';
import { ItineraryDisplay } from '../components/ItineraryDisplay';
import { generateTrip } from '../services/api';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const CreateTrip = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGenerateTrip = async (formData) => {
    // Check if user is logged in
    if (!currentUser) {
      const shouldLogin = window.confirm('Please sign in to save your trip! Would you like to sign in now?');
      if (shouldLogin) {
        navigate('/login');
      }
      return;
    }

    setLoading(true);
    try {
      console.log('Generating trip with data:', formData);
      const response = await generateTrip(formData);
      console.log('Trip generated:', response);
      
      setItinerary(response.itinerary);
      
      // Save to Firebase with user ID
      await addDoc(collection(db, 'trips'), {
        ...formData,
        itinerary: response.itinerary,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date().toISOString()
      });
      
      console.log('Trip saved to Firebase!');
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {!itinerary ? (
          <div>
            <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">
              Create Your Dream Trip
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Tell us about your travel plans and let AI do the rest
            </p>

            {/* Show login prompt if not authenticated */}
            {!currentUser && (
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm text-center">
                  💡 <strong>Tip:</strong> Sign in to save your trips!{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign in now
                  </button>
                </p>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                <h3 className="text-xl font-semibold mb-2">Creating Your Perfect Itinerary...</h3>
                <p className="text-gray-600">This may take 10-15 seconds</p>
              </div>
            ) : (
              <TripForm onSubmit={handleGenerateTrip} loading={loading} />
            )}
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setItinerary(null)}
                variant="secondary"
              >
                <ArrowLeft className="inline mr-2" size={18} />
                Create New Trip
              </Button>
            </div>
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        )}
      </div>
    </div>
  );
};