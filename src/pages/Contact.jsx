import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MapPinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export default function ContactPage() {
    const [message, setMessage] = useState('');
    const maxLength = 500;
    const pageRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const ctx = gsap.context(() => {
            // Left column animation
            gsap.fromTo(
                leftRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
            );

            // Right column (form) animation
            gsap.fromTo(
                rightRef.current,
                { opacity: 0, x: 50, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
            );

            // Cards stagger animation
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center p-4 py-12">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Information */}
                    <div ref={leftRef} className="text-gray-800 pt-4">
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
                        <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
                            Have questions about our courses? We're here to help you succeed in your entry test preparation journey.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <MailIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-medium text-slate-900">support@prepsuccess.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <PhoneIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Phone</p>
                                    <p className="font-medium text-slate-900">+92 321-221-2310</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Location</p>
                                    <p className="font-medium text-slate-900">Lahore, Pakistan</p>
                                </div>
                            </div>
                        </div>

                        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
                                <h3 className="font-semibold text-slate-900 mb-2">Customer Support</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Our support team is available to address any concerns or queries you may have.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
                                <h3 className="font-semibold text-slate-900 mb-2">Feedback</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    We value your feedback and continuously work to improve our platform.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div ref={rightRef} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                        <p className="text-slate-500 mb-6 text-sm">We'll get back to you within 24 hours</p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div className="relative">
                                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full p-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="relative w-28">
                                    <select className="appearance-none w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition">
                                        <option>+92</option>
                                        <option>+1</option>
                                        <option>+44</option>
                                        <option>+91</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <textarea
                                    placeholder="How can we help you?"
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={maxLength}
                                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                                ></textarea>
                                <p className="text-right text-xs text-slate-400 mt-1">
                                    {message.length}/{maxLength}
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                Send Message
                            </button>

                            <p className="text-center text-xs text-slate-500">
                                By contacting us, you agree to our <a href="#" className="font-medium text-slate-700 hover:text-blue-600">Terms of Service</a> and <a href="#" className="font-medium text-slate-700 hover:text-blue-600">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
