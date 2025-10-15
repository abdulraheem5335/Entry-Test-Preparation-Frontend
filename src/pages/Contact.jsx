import React, { useState } from 'react';

// You might need to install a library for icons, like 'lucide-react'.
// For this example, I'll create simple SVG components.

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


export default function ContactPage() {
    const [message, setMessage] = useState('');
    const maxLength = 120;

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans flex items-center justify-center p-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Information */}
                    <div className="text-gray-800 pt-8">
                        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-gray-600 mb-8 max-w-md">
                            Email, call, or complete the form to learn how Snappy can solve your messaging problem.
                        </p>
                        
                        <div className="space-y-4 mb-12">
                            <p className="text-lg font-medium">info@snappy.io</p>
                            <p className="text-lg font-medium">321-221-231</p>
                            <a href="#" className="text-lg font-medium text-black border-b-2 border-black pb-1 inline-block">
                                Customer Support
                            </a>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Our support team is available around the clock to address any concerns or queries you may have.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Feedback and Suggestions</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    We value your feedback and are continuously working to improve Snappy. Your input is crucial in shaping the future of Snappy.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Media Inquiries</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    For media-related questions or press inquiries, please contact us at <a href="mailto:media@snappyapp.com" className="text-black font-medium">media@snappyapp.com</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                        <p className="text-gray-500 mb-8">You can reach us anytime</p>
                        
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="First name" className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input type="text" placeholder="Last name" className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            
                            <div className="relative mb-4">
                                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input type="email" placeholder="Your email" className="w-full p-3 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="flex gap-2 mb-4">
                                <div className="relative">
                                    <select className="appearance-none w-24 p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                                        <option>+62</option>
                                        <option>+1</option>
                                        <option>+44</option>
                                        <option>+91</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"/>
                                </div>
                                <input type="tel" placeholder="Phone number" className="flex-1 p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            
                            <div className="relative mb-4">
                                <textarea 
                                    placeholder="How can we help?" 
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={maxLength}
                                    className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                ></textarea>
                                <p className="text-right text-sm text-gray-400">
                                    {message.length}/{maxLength}
                                </p>
                            </div>
                            
                            <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                                Submit
                            </button>
                            
                            <p className="text-center text-xs text-gray-500 mt-4">
                                By contacting us, you agree to our <a href="#" className="font-bold text-gray-800">Terms of service</a> and <a href="#" className="font-bold text-gray-800">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
