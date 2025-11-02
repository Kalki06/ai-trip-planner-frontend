import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Sparkles, MapPin, Calendar, Wand2, Globe } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-full shadow-2xl">
                <Globe className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Trip <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              with AI Magic ✨
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized travel itineraries in seconds. Just tell us where you want to go, 
            and let our AI create the perfect adventure for you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button 
              onClick={() => navigate('/create-trip')}
              className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
            >
              <Wand2 className="inline mr-2" size={20} />
              Start Planning Now
            </Button>
            
            <Button 
              onClick={() => navigate('/create-trip')}
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              <Sparkles className="inline mr-2" size={20} />
              Try It Free
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Destination</h3>
              <p className="text-gray-600 text-sm">Pick where you want to explore</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Set Preferences</h3>
              <p className="text-gray-600 text-sm">Tell us your budget and interests</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Get AI Itinerary</h3>
              <p className="text-gray-600 text-sm">Receive your personalized plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};