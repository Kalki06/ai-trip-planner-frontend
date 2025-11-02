import { Hero } from '../components/Hero';

export const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose AI Trip Planner?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-blue-600">⚡ Lightning Fast</h3>
            <p className="text-gray-700">
              Get a complete travel itinerary in seconds, not hours. Our AI processes your preferences instantly.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-purple-600">🎯 Personalized</h3>
            <p className="text-gray-700">
              Every itinerary is tailored to your budget, interests, and travel style. No generic templates.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-green-600">💰 Budget-Friendly</h3>
            <p className="text-gray-700">
              Set your budget and get recommendations that fit perfectly. From budget to luxury travel.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-orange-600">🌍 Worldwide</h3>
            <p className="text-gray-700">
              Plan trips to any destination worldwide. From popular cities to hidden gems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};