import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { CreateTrip } from './pages/CreateTrip';
import { MyTrips } from './pages/MyTrips';
import { ViewTrip } from './pages/ViewTrip';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/view-trip" element={<ViewTrip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-20 print:hidden">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 mb-2">
              © 2024 AI Trip Planner. Built with ❤️ using React, AI & Firebase
            </p>
            <p className="text-gray-500 text-sm">
              Your personal AI travel assistant
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;