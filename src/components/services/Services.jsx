import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const { isLoading } = useAuth();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');
    const [bookingData, setBookingData] = useState({ name: '', date: '', time: '', address: '', contactNumber: '' });
    const [selectedService, setSelectedService] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Define the base API URL from the environment variable
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    // Create the Ref for scrolling to the form
    const formRef = useRef(null);

    const workingHours = [
        '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];
    const [showDelayMsg, setShowDelayMsg] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => setShowDelayMsg(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Use API_BASE_URL
                const response = await axios.get(`${API_BASE_URL}/services`);
                setServices(response.data);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Failed to fetch services.');
            }
        };
        fetchServices();
    }, []);

    const fetchAvailableSlots = async (serviceId, date) => {
        try {
            // Use API_BASE_URL
            const response = await axios.get(`${API_BASE_URL}/bookings/available-slots?serviceId=${serviceId}&date=${date}`);
            const bookedTimes = response.data.bookedTimes;
            const available = workingHours.filter(slot => !bookedTimes.includes(slot));
            setAvailableSlots(available);
            if (!available.length) {
                setMessage('No slots available for this date. Please choose another date.');
            }
        } catch (error) {
            setMessage('Failed to fetch available slots.');
        }
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });

        if (name === 'date' && selectedService) {
            fetchAvailableSlots(selectedService._id, value);
        }
    };

    // New handler to select service AND scroll to the form
    const handleBookClick = (service) => {
        setSelectedService(service);
        if (bookingData.date) {
            fetchAvailableSlots(service._id, bookingData.date);
        }

        // SMOOTH SCROLL LOGIC
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleBookService = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!selectedService) {
            setMessage('Please select a service.');
            setShowModal(true);
            setIsSuccess(false);
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(bookingData.date);
        const contactNumber = bookingData.contactNumber;

        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            setMessage('You cannot book a service for a past date.');
            setIsSuccess(false);
            setShowModal(true);
            return;
        }

        if (!/^\d{10}$/.test(contactNumber)) {
            setMessage('Please enter a valid 10-digit contact number.');
            setIsSuccess(false);
            setShowModal(true);
            return;
        }

        if (bookingData.time === '') {
            setMessage('Please select a time slot.');
            setIsSuccess(false);
            setShowModal(true);
            return;
        }

        try {
            const payload = {
                ...bookingData,
                serviceId: selectedService._id,
            };

            // Use API_BASE_URL
            await axios.post(`${API_BASE_URL}/bookings`, payload);

            setMessage('Booking confirmed! You will get a call from our technician soon to confirm service details.');
            setIsSuccess(true);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 3000);

            setSelectedService(null);
            setBookingData({ name: '', date: '', time: '', address: '', contactNumber: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to book service. Please try again.');
            setIsSuccess(false);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setMessage('');
    };

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

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0b1e] via-[#1a0b2e] to-[#0a0b1e] py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff006e] rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
            </div>

            <div className="relative z-10 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">Our Services</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose from our comprehensive range of AC services designed for your comfort</p>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                        <div className={`p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border ${isSuccess ? 'bg-gradient-to-br from-[#1a1a2e] to-[#0f4c3a] border-green-500/30' : 'bg-gradient-to-br from-[#1a1a2e] to-[#4c0f0f] border-red-500/30'}`}>
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {isSuccess ? (
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>{isSuccess ? 'Success!' : 'Error!'}</h3>
                            <p className="mb-6 text-gray-300">{message}</p>
                            <button onClick={closeModal} className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isSuccess ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>Close</button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {services.length === 0 ? (
                        <div className="col-span-3 flex flex-col justify-center items-center py-16 text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                            {showDelayMsg && (
                                <div>
                                    <p className="text-gray-500 font-medium">Loading services...</p>
                                    <p className="text-lg text-gray-400 mt-1">
                                        This may take up to{" "}
                                        <span className="font-semibold text-emerald-500">2 minutes</span>.
                                    </p>
                                </div>
                            )}
                        </div>


                    ) : (
                        services.map((service) => (
                            <div key={service._id} className={`group relative p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border transition-all duration-500 flex flex-col justify-between ${selectedService?._id === service._id ? 'border-[#ff006e] shadow-lg shadow-[#ff006e]/20' : 'border-white/5 hover:border-white/10'}`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/0 to-[#ff006e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedService?._id === service._id ? 'bg-[#ff006e]/20' : 'bg-[#6366f1]/20'}`}>
                                            <svg className={`w-6 h-6 ${selectedService?._id === service._id ? 'text-[#ff006e]' : 'text-[#6366f1]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        {selectedService?._id === service._id && (
                                            <span className="text-xs text-[#ff006e] font-semibold bg-[#ff006e]/10 px-3 py-1 rounded-full">Selected</span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-3">{service.name}</h2>
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-3xl font-bold text-white">₹{service.price}</span>
                                        <span className="text-sm text-gray-400">({service.duration} mins)</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleBookClick(service)}
                                    className={`relative z-10 w-full px-4 py-3 rounded-full transition-all duration-300 font-semibold ${selectedService?._id === service._id ? 'bg-[#ff006e] text-white shadow-lg shadow-[#ff006e]/30' : 'bg-[#6366f1] text-white hover:bg-[#7c3aed]'}`}
                                >
                                    {selectedService?._id === service._id ? 'Selected ✓' : 'Double Click To Book Now'}
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {selectedService && (
                    <div ref={formRef} className="max-w-3xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e]/80 to-[#2d1b3d]/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="inline-block p-3 bg-[#ff006e]/10 rounded-full mb-4">
                                <svg className="w-8 h-8 text-[#ff006e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Book {selectedService.name}</h2>
                            <p className="text-gray-400">Fill in your details to schedule your service</p>
                        </div>

                        <form onSubmit={handleBookService} className="space-y-6">
                            <div>
                                <label className="block text-white font-semibold mb-2">Full Name *</label>
                                <input type="text" name="name" value={bookingData.name} onChange={handleBookingChange} placeholder="Enter your full name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" required />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Service Date *</label>
                                <input type="date" name="date" value={bookingData.date} onChange={handleBookingChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" required />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Preferred Time Slot *</label>
                                <select name="time" value={bookingData.time} onChange={handleBookingChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!bookingData.date} required>
                                    <option value="" className="bg-[#1a1a2e]">Select a time slot</option>
                                    {availableSlots.map(slot => (
                                        <option key={slot} value={slot} className="bg-[#1a1a2e]">{slot}</option>
                                    ))}
                                </select>
                                {!bookingData.date && <p className="text-gray-400 text-sm mt-2">Please select a date first</p>}
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Service Address *</label>
                                <input type="text" name="address" value={bookingData.address} onChange={handleBookingChange} placeholder="Enter your complete address" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" required />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Contact Number *</label>
                                <input type="tel" name="contactNumber" value={bookingData.contactNumber} onChange={handleBookingChange} placeholder="Enter 10-digit mobile number" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" required />
                            </div>

                            <button type="submit" className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full hover:shadow-lg hover:shadow-[#6366f1]/50 hover:scale-[1.02] transition-all duration-300">
                                Confirm Booking
                            </button>

                            <p className="text-center text-gray-400 text-sm">Our technician will call you to confirm the booking details</p>
                        </form>
                    </div>
                )}

                {!selectedService && (
                    <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-br from-[#6366f1]/10 to-[#ff006e]/10 backdrop-blur-sm rounded-3xl border border-white/10 text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">How It Works</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-[#6366f1]/20 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-[#6366f1] font-bold text-xl">1</span>
                                </div>
                                <p className="text-white font-semibold mb-2">Choose Service</p>
                                <p className="text-gray-400 text-sm">Select the AC service you need</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-[#ff006e]/20 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-[#ff006e] font-bold text-xl">2</span>
                                </div>
                                <p className="text-white font-semibold mb-2">Book Slot</p>
                                <p className="text-gray-400 text-sm">Fill details & pick your time</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-[#8b5cf6] font-bold text-xl">3</span>
                                </div>
                                <p className="text-white font-semibold mb-2">Get Service</p>
                                <p className="text-gray-400 text-sm">Expert arrives at your doorstep</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;