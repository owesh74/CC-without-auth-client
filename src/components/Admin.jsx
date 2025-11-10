import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Admin = () => {
    const { isAdmin, isLoggedIn, isLoading } = useAuth();
    const [allBookings, setAllBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');
    const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '' });
    const [message, setMessage] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

  
 // ✅ Use your environment variable
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // ✅ Memoize these functions so ESLint and React Hooks are happy
  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/admin/bookings`, {
        headers: { "x-auth-token": token },
      });
      setAllBookings(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch bookings.");
    }
  }, [API_BASE_URL]); // include API_BASE_URL

  const fetchServices = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/admin/services`, {
        headers: { "x-auth-token": token },
      });
      setServices(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch services.");
    }
  }, [API_BASE_URL]); // include API_BASE_URL

  // ✅ Call them when ready
  useEffect(() => {
    if (!isLoading && isAdmin) {
      fetchBookings();
      fetchServices();
    }
  }, [isLoading, isAdmin, fetchBookings, fetchServices]);


    const handleServiceChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            // Use API_BASE_URL
            await axios.post(`${API_BASE_URL}/admin/services`, newService, {
                headers: { 'x-auth-token': token }
            });
            setMessage('Service added successfully!');
            fetchServices();
            setNewService({ name: '', description: '', price: '', duration: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add service.');
        }
    };

    const handleDeleteService = async (serviceId) => {
    setMessage('');

    // Confirmation popup before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return; // Stop if user cancels

    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/admin/services/${serviceId}`, {
            headers: { 'x-auth-token': token }
        });

        setMessage('Service deleted successfully!');
        window.alert('Service deleted successfully!'); // Success popup
        fetchServices(); // Refresh the list
    } catch (error) {
        const errMsg = error.response?.data?.message || 'Failed to delete service.';
        setMessage(errMsg);
        window.alert(errMsg); // Error popup
    }
};


    const handleUpdateStatus = async (bookingId, newStatus) => {
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            // Use API_BASE_URL
            await axios.put(`${API_BASE_URL}/admin/bookings/${bookingId}/status`, { status: newStatus }, {
                headers: { 'x-auth-token': token }
            });
            setMessage('Booking status updated successfully!');
            fetchBookings();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to update booking status.');
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) {
            return;
        }
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            // Use API_BASE_URL
            await axios.delete(`${API_BASE_URL}/admin/bookings/${bookingId}`, {
                headers: { 'x-auth-token': token }
            });
            setMessage('Booking deleted successfully!');
            fetchBookings();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to delete booking.');
        }
    };
    
    const filteredBookings = allBookings.filter(booking => 
        statusFilter === 'All' || booking.status === statusFilter
    );

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a0b1e 0%, #1a1b3e 100%)'}}>
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{borderColor: '#ff006e'}}></div>
                <p className="mt-4 text-xl text-gray-300">Loading...</p>
            </div>
        </div>
    );
    
    if (!isLoggedIn || !isAdmin) return (
        <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a0b1e 0%, #1a1b3e 100%)'}}>
            <div className="text-center p-8 rounded-2xl" style={{background: 'rgba(255, 0, 110, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 0, 110, 0.3)'}}>
                <svg className="w-20 h-20 mx-auto mb-4" style={{color: '#ff006e'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-2xl font-bold text-white">Access Denied</h2>
                <p className="mt-2 text-gray-400">You need admin privileges to access this page.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0b1e 0%, #1a1b3e 100%)'}}>
        
    
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold mb-2" style={{background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400">Manage your services and bookings</p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8 p-2 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                    <nav className="flex space-x-2">
                        <button
                            className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                                activeTab === 'bookings' 
                                    ? 'text-white shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                            style={activeTab === 'bookings' ? {background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)'} : {}}
                            onClick={() => setActiveTab('bookings')}
                        >
                            📋 Manage Bookings
                        </button>
                        <button
                            className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 ${
                                activeTab === 'services' 
                                    ? 'text-white shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                            style={activeTab === 'services' ? {background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)'} : {}}
                            onClick={() => setActiveTab('services')}
                        >
                            ⚙️ Manage Services
                        </button>
                    </nav>
                </div>

                {/* Message Display */}
                {message && (
                    <div className="mb-6 p-4 rounded-xl text-center font-medium animate-fade-in" style={{
                        background: message.includes('success') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${message.includes('success') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        color: message.includes('success') ? '#10b981' : '#ef4444'
                    }}>
                        {message}
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div>
                        <div className="mb-6 p-6 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h2 className="text-2xl font-bold text-white">All Bookings</h2>
                                <div className="flex items-center space-x-3">
                                    <label className="font-medium text-gray-300">Filter:</label>
                                    <select
                                        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'white',
                                            focusRingColor: '#ff006e'
                                        }}
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All" style={{background: '#1a1b3e'}}>All</option>
                                        <option value="Pending" style={{background: '#1a1b3e'}}>Pending</option>
                                        <option value="Assigned" style={{background: '#1a1b3e'}}>Assigned</option>
                                        <option value="Completed" style={{background: '#1a1b3e'}}>Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {filteredBookings.length === 0 ? (
                            <div className="text-center p-12 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                                <p className="text-gray-400 text-lg">No {statusFilter !== 'All' && statusFilter} bookings found.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {filteredBookings.map((booking) => (
                                    <div 
                                        key={booking._id} 
                                        className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-[#ff006e]/30"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-white">{booking.serviceId?.name || 'N/A'}</h3>
                                            <span 
                                                className="px-3 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: booking.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : 
                                                                booking.status === 'Assigned' ? 'rgba(59, 130, 246, 0.2)' : 
                                                                'rgba(251, 191, 36, 0.2)',
                                                    color: booking.status === 'Completed' ? '#10b981' : 
                                                           booking.status === 'Assigned' ? '#3b82f6' : 
                                                           '#fbbf24'
                                                }}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Customer Name</p>
                                                <p className="text-white font-semibold">{booking.customerName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Contact Number</p>
                                                <p className="text-white font-semibold">{booking.contactNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Date</p>
                                                <p className="text-white font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Address</p>
                                                <p className="text-white font-semibold">{booking.address}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between flex-wrap gap-4 mt-6 pt-4" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                                            <div className="flex items-center space-x-3">
                                                <label className="text-gray-300 font-semibold">Status:</label>
                                                <select
                                                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2"
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        color: 'white'
                                                    }}
                                                    value={booking.status}
                                                    onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                                                >
                                                    <option value="Pending" style={{background: '#1a1b3e'}}>Pending</option>
                                                    <option value="Assigned" style={{background: '#1a1b3e'}}>Assigned</option>
                                                    <option value="Completed" style={{background: '#1a1b3e'}}>Completed</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteBooking(booking._id)}
                                                className="px-6 py-2 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div>
                        {/* Add Service Form */}
                        <div className="mb-8 p-8 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4" style={{background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)'}}>
                                    ➕
                                </div>
                                <h2 className="text-2xl font-bold text-white">Add New Service</h2>
                            </div>
                            <form onSubmit={handleAddService} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Service Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={newService.name} 
                                        onChange={handleServiceChange}
                                        placeholder="e.g., AC Installation"
                                        className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'white',
                                            focusRingColor: '#ff006e'
                                        }}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={newService.description} 
                                        onChange={handleServiceChange}
                                        placeholder="Describe the service..."
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'white',
                                            focusRingColor: '#ff006e'
                                        }}
                                        required
                                    ></textarea>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Price (₹)</label>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            value={newService.price} 
                                            onChange={handleServiceChange}
                                            placeholder="500"
                                            className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                                focusRingColor: '#ff006e'
                                            }}
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Duration (minutes)</label>
                                        <input 
                                            type="number" 
                                            name="duration" 
                                            value={newService.duration} 
                                            onChange={handleServiceChange}
                                            placeholder="60"
                                            className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                                focusRingColor: '#ff006e'
                                            }}
                                            required 
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full py-3 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}
                                    onClick={() => window.alert('Service added! 🎉')}
                                >
                                    ✨ Add Service
                                </button>
                            </form>
                        </div>

                        {/* Existing Services */}
                        <div className="mb-6 p-6 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                            <h2 className="text-2xl font-bold text-white">Existing Services</h2>
                        </div>

                        {services.length === 0 ? (
                            <div className="text-center p-12 rounded-2xl" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                                <p className="text-gray-400 text-lg">No services found.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <div 
                                        key={service._id} 
                                        className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110" style={{background: 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 100%)'}}>
                                                ⚙️
                                            </div>
                                            <button
                                                onClick={() => handleDeleteService(service._id)}
                                                className="px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                                                style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                                        <p className="text-gray-400 mb-4">{service.description}</p>
                                        <div className="flex items-center justify-between pt-4" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                                            <div>
                                                <p className="text-gray-400 text-sm">Price</p>
                                                <p className="text-white font-bold text-xl">₹{service.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-400 text-sm">Duration</p>
                                                <p className="text-white font-bold">{service.duration} mins</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;