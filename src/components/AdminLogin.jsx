import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const API_URL = process.env.REACT_APP_API_URL + "/auth/admin-pass-login";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        try {
            const response = await axios.post(API_URL, { password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.user.email);
            setMessage('Login successful!');
            window.location.href = '/admin';
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Invalid Password. Please check.';
            setMessage(errorMessage);
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a0b1e 0%, #1a1b3e 100%)'}}>
            <div className="w-full max-w-md mx-4">
                <div 
                    className="p-8 rounded-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                    }}
                >
              

                    <h1 
                        className="text-4xl font-bold text-center mb-2"
                        style={{
                            background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Admin Login
                    </h1>
                    <p className="text-center text-gray-400 mb-8">Enter the Admin Password to continue.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full py-3 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
                            style={{background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)'}}
                        >
                            Login
                        </button>
                    </form>
                    
                    {message && (
                        <div 
                            className="mt-6 p-4 rounded-lg text-center font-medium"
                            style={{
                                background: message.includes('successful') 
                                    ? 'rgba(16, 185, 129, 0.1)' 
                                    : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${message.includes('successful') 
                                    ? 'rgba(16, 185, 129, 0.3)' 
                                    : 'rgba(239, 68, 68, 0.3)'}`,
                                color: message.includes('successful') ? '#10b981' : '#ef4444'
                            }}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;