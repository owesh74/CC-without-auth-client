import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './components/Home.jsx';
import Admin from './components/Admin.jsx';
import AdminLogin from './components/AdminLogin.jsx'; 
import Services from './components/services/Services.jsx';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children, roles = ['user', 'admin'] }) => {
    const { isLoggedIn, user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0b1e] via-[#1a0b2e] to-[#0a0b1e]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-white">Loading...</p>
                </div>
            </div>
        );
    }
    
    // Only allow access if user is logged in AND is an admin
    if (!isLoggedIn || user.role !== 'admin') {
        // If not logged in, redirect to login page
        return <Navigate to="/admin-login" replace />; 
    }
    
    return children;
};

// Navbar component for navigation
const Navbar = () => {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current location

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children, isButton = false, onClick }) => {
        const active = isActive(to);
        return (
            <Link 
                to={to} 
                onClick={onClick ? onClick : () => setIsOpen(false)}
                className={`block px-4 py-2 rounded-full text-base font-medium transition-all duration-300 backdrop-blur-xl ${
                    active 
                        ? 'text-[#ff006e] shadow-lg' 
                        : isButton 
                            ? 'bg-white/10 text-white hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 hover:scale-105' 
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
                {children}
            </Link>
        );
    };

    return (
        <nav className="bg-black/30 backdrop-blur-2xl text-white shadow-2xl sticky top-0 z-50 relative overflow-hidden">
            {/* Liquid glass effect layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 via-[#ff006e]/5 to-[#8b5cf6]/10 backdrop-blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between py-4">
                    {/* Logo/Brand */}
       <Link
  to="/"
  className="flex flex-col items-start relative z-10"
  onClick={() => setIsOpen(false)}
>
  <span 
    className="text-2xl md:text-2xl font-bold hover:scale-105 transition-all duration-300 drop-shadow-lg"
    style={{
      backgroundImage: 'linear-gradient(135deg, #ff006e 0%, #d946ef 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    }}
  >
    AirCoolService
  </span>
  <span className="text-xs md:text-xs text-gray-300 -mt-1">
    Ac Services In Chhindwara
  </span>
</Link>
                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center relative z-10">
                        <button 
                            onClick={toggleMenu} 
                            className="inline-flex items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-xl text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all duration-300 shadow-lg"
                        >
                            <svg className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90 hidden' : 'rotate-0 block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-0 block' : '-rotate-90 hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu Links */}
                    <div className="hidden md:flex space-x-2 items-center relative z-10">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/services">Book Service</NavLink>
                        {isLoggedIn && isAdmin ? (
                            <>
                                <NavLink to="/admin">Dashboard</NavLink>
                                <button 
                                    onClick={logout} 
                                    className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Collapsible) */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pb-4 space-y-2 pt-4 bg-black/20 backdrop-blur-2xl relative z-10">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/services">Book Service</NavLink>
                    {isLoggedIn && isAdmin ? (
                        <>
                            <NavLink to="/admin">Dashboard</NavLink>
                            <button 
                                onClick={logout} 
                                className="w-full text-left px-4 py-2 rounded-full text-base font-medium text-white bg-white/5 backdrop-blur-xl hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#1a0b2e] to-[#0a0b1e]">
                    <Navbar />
                    <div className="container mx-auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} /> 
                            <Route path="/admin-login" element={<AdminLogin />} /> 

                            {/* Admin Protected Route */}
                            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

                            {/* Fallback route */}
                            <Route path="*" element={
                                <div className="min-h-screen flex items-center justify-center px-4">
                                    <div className="text-center p-8 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <h1 className="text-4xl md:text-6xl font-bold text-red-400 mb-4">404</h1>
                                        <p className="text-xl md:text-2xl text-white mb-6">Page Not Found</p>
                                        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                                        <Link 
                                            to="/" 
                                            className="inline-block px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#6366f1]/50 hover:scale-105 transition-all duration-300"
                                        >
                                            Go Home
                                        </Link>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;