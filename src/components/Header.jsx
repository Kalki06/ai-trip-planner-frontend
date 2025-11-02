import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, Home, MapPin, Briefcase, User, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  // Get user display name or email
  const getUserDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <span className="hidden sm:inline">AI Trip Planner</span>
          <span className="sm:hidden">TripAI</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-2 font-medium transition-colors ${
              isActive('/') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Home size={18} />
            Home
          </Link>
          
          {currentUser && (
            <Link 
              to="/my-trips" 
              className={`flex items-center gap-2 font-medium transition-colors ${
                isActive('/my-trips') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Briefcase size={18} />
              My Trips
            </Link>
          )}
          
          <Link 
            to="/create-trip" 
            className={`flex items-center gap-2 font-medium transition-colors ${
              isActive('/create-trip') 
                ? 'text-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <MapPin size={18} />
            Create Trip
          </Link>
          
          {currentUser ? (
            // User Menu
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-all"
              >
                <User size={18} />
                <span className="max-w-[100px] truncate">{getUserDisplayName()}</span>
              </button>

              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  ></div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/my-trips"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Briefcase size={16} />
                      My Trips
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Login/Signup Buttons
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                <LogIn size={18} />
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {currentUser && (
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-600">{currentUser.email}</p>
              </div>
            )}

            <Link 
              to="/" 
              className={`flex items-center gap-2 font-medium py-2 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            
            {currentUser && (
              <Link 
                to="/my-trips" 
                className={`flex items-center gap-2 font-medium py-2 ${
                  isActive('/my-trips') ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={18} />
                My Trips
              </Link>
            )}
            
            <Link 
              to="/create-trip" 
              className={`flex items-center gap-2 font-medium py-2 ${
                isActive('/create-trip') ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <MapPin size={18} />
              Create Trip
            </Link>
            
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 text-red-600 font-medium py-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
