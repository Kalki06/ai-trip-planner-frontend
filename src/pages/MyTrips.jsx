import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loader2, Trash2, Eye, Calendar, MapPin, DollarSign, Users } from 'lucide-react';

export const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Load all trips from Firebase
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    loadTrips();
  }, [currentUser, navigate]);

  const loadTrips = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // Query trips for the current user only
      const q = query(
        collection(db, 'trips'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const tripsData = [];
      
      querySnapshot.forEach((docSnap) => {
        tripsData.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      
      setTrips(tripsData);
      console.log('✅ Loaded trips:', tripsData.length);
    } catch (error) {
      console.error('❌ Error loading trips:', error);
      if (error.code === 'failed-precondition' || error.code === 'unavailable') {
        alert('Database index is being created. Please wait a moment and refresh the page.');
      } else {
        alert('Failed to load trips. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete a trip
  const handleDelete = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;

    try {
      await deleteDoc(doc(db, 'trips', tripId));
      setTrips(trips.filter((trip) => trip.id !== tripId));
      console.log('✅ Trip deleted');
      alert('Trip deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting trip:', error);
      alert('Failed to delete trip. Please try again.');
    }
  };

  // View full itinerary
  const handleView = (trip) => {
    navigate('/view-trip', { state: { trip } });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Loading your trips...</h3>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Trips</h1>
          <Card className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <MapPin size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No trips yet!</h2>
            <p className="text-gray-600 mb-8">Start planning your next adventure</p>
            <Button onClick={() => navigate('/create-trip')}>
              Create Your First Trip ✨
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Show list of trips
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-gray-600">
              You have {trips.length} saved trip{trips.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => navigate('/create-trip')}>
            + Create New Trip
          </Button>
        </div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card 
              key={trip.id} 
              className="hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
            >
              {/* Trip Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    trip.itinerary?.destinationImage ||
                    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
                  }
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {trip.itinerary?.tripTitle || trip.destination}
                  </h3>
                </div>
              </div>

              {/* Trip Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="font-medium">{trip.destination}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-green-600" />
                  <span>{trip.days} days</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} className="text-purple-600" />
                  <span>
                    {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="font-semibold">{trip.budget} Budget</span>
                </div>

                {trip.interests && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {trip.interests.split(',').slice(0, 3).map((interest, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {interest.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Created: {new Date(trip.createdAt).toLocaleDateString()}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3">
                  <Button
                    onClick={() => handleView(trip)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(trip.id);
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
