import React, { useState } from 'react';

const Home = () => {
    const [showFixedToaster, setShowFixedToaster] = useState(false);
    const CONTACT_NUMBER = "7620437704"; 

    const handleCall = () => {
        window.location.href = `tel:${CONTACT_NUMBER}`;
    };

    const handleBookOnline = () => {
        window.location.href = '/services';
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0b1e] via-[#1a0b2e] to-[#0a0b1e]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff006e] rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-3xl opacity-10" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 pt-12 md:pt-20 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6 backdrop-blur-sm">
                        Professional AC Services • Available 24/7
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                        Your Trusted Partner for<br />Complete AC Solutions
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 font-normal max-w-3xl mx-auto leading-relaxed">
                        From installation to emergency repairs, we deliver exceptional AC services with certified technicians, transparent pricing, and guaranteed satisfaction across Chindwara.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={handleBookOnline}
                            className="px-8 py-4 text-base sm:text-lg font-semibold text-white bg-[#6366f1] rounded-full hover:bg-[#7c3aed] transition-all duration-300 shadow-lg shadow-[#6366f1]/20"
                        >
                            Book Service Now
                        </button>
                        <button
                            onClick={handleCall}
                            className="px-8 py-4 text-base sm:text-lg font-semibold text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                        >
                            Call Us Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Choose CoolCare Section */}
            <div className="mt-20 sm:mt-32 w-full px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Why Choose CoolCare?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Experience the difference with our comprehensive AC service solutions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Card 01 */}
                        <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 transform transition-all duration-500 hover:border-[#ff006e]/30 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/0 to-[#ff006e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="text-[#ff006e] text-5xl font-bold mb-4">01</div>
                                <h3 className="text-xl font-semibold text-white mb-3">Certified Experts</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Highly trained technicians with 10+ years of experience in all AC brands and models</p>
                            </div>
                        </div>

                        {/* Card 02 */}
                        <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 transform transition-all duration-500 hover:border-[#ff006e]/30 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/0 to-[#ff006e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="text-[#ff006e] text-5xl font-bold mb-4">02</div>
                                <h3 className="text-xl font-semibold text-white mb-3">Same-Day Service</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Emergency repairs and installations completed within 24 hours with premium parts</p>
                            </div>
                        </div>

                        {/* Card 03 */}
                        <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 transform transition-all duration-500 hover:border-[#ff006e]/30 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/0 to-[#ff006e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="text-[#ff006e] text-5xl font-bold mb-4">03</div>
                                <h3 className="text-xl font-semibold text-white mb-3">Transparent Pricing</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Upfront quotes with no hidden charges. Pay only for what you see and approve</p>
                            </div>
                        </div>

                        {/* Card 04 */}
                        <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 transform transition-all duration-500 hover:border-[#ff006e]/30 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff006e]/0 to-[#ff006e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="text-[#ff006e] text-5xl font-bold mb-4">04</div>
                                <h3 className="text-xl font-semibold text-white mb-3">90-Day Warranty</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Every service backed by our comprehensive warranty and satisfaction guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="mt-20 sm:mt-32 w-full px-4 relative z-10 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Our Services
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Complete AC solutions for residential and commercial spaces
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Service Card 1 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#6366f1]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">AC Installation</h3>
                            <p className="text-gray-400 text-sm">Professional installation of all AC types with proper sizing consultation and optimal placement</p>
                        </div>

                        {/* Service Card 2 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#ff006e]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#ff006e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Repair & Maintenance</h3>
                            <p className="text-gray-400 text-sm">Quick diagnostics and repairs for cooling issues, gas leaks, noise problems, and electrical faults</p>
                        </div>

                        {/* Service Card 3 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Deep Cleaning</h3>
                            <p className="text-gray-400 text-sm">Thorough cleaning of filters, coils, and drainage with eco-friendly chemicals for better air quality</p>
                        </div>

                        {/* Service Card 4 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#06b6d4]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Gas Refilling</h3>
                            <p className="text-gray-400 text-sm">Expert refrigerant recharging with leak detection and pressure testing for optimal cooling</p>
                        </div>

                        {/* Service Card 5 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Uninstallation & Reinstallation</h3>
                            <p className="text-gray-400 text-sm">Safe removal and reinstallation services for home relocation or AC repositioning</p>
                        </div>

                        {/* Service Card 6 */}
                        <div className="p-6 bg-gradient-to-br from-[#1a1a2e]/60 to-[#2d1b3d]/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#ec4899]/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">24/7 Emergency Support</h3>
                            <p className="text-gray-400 text-sm">Round-the-clock emergency services for urgent AC breakdowns and critical repairs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#6366f1]/10 to-[#ff006e]/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 sm:p-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Ready to Experience Superior AC Service?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Book online in 60 seconds or call us now for immediate assistance. Our team is ready to serve you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={handleBookOnline}
                            className="px-8 py-4 text-lg font-semibold text-white bg-[#6366f1] rounded-full hover:bg-[#7c3aed] transition-all duration-300 shadow-lg shadow-[#6366f1]/20"
                        >
                            Book Your Service
                        </button>
                        <button
                            onClick={handleCall}
                            className="px-8 py-4 text-lg font-semibold text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                        >
                            Call {CONTACT_NUMBER}
                        </button>
                    </div>
                </div>
            </div>

            {/* Fixed Call Button (FAB) */}
            <button
                onClick={() => setShowFixedToaster(true)}
                className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4 bg-gradient-to-br from-[#ff006e] to-[#d90368] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.137a11.042 11.042 0 005.516 5.516l1.137-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </button>

            {/* Styled Toaster Pop-up */}
            {showFixedToaster && (
                <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 bg-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 w-72 sm:w-80 z-50 transform transition-all duration-300" style={{animation: 'slideUp 0.3s ease-out'}}>
                    <div className="flex justify-between items-center p-4 border-b border-white/10">
                        <div className="flex items-center text-[#ff006e] font-semibold text-sm sm:text-base"> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>Quick Contact</span>
                        </div>
                        <button
                            onClick={() => setShowFixedToaster(false)}
                            className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-4 sm:p-5">
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            Get instant support from our AC experts. We're available 24/7 for your service needs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 mt-2">
                            <span className="text-lg sm:text-xl text-white font-bold">{CONTACT_NUMBER}</span>
                            <button
                                onClick={handleCall}
                                className="w-full sm:w-auto px-5 py-2.5 bg-[#6366f1] text-white rounded-full hover:bg-[#7c3aed] transition-all duration-300 text-sm font-semibold"
                            >
                                Call Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;