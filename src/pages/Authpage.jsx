import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';

// --- Icon Components ---
const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.219,44,30.556,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V8h3v11zM6.5 6.73c-.966 0-1.75-.79-1.75-1.764S5.534 3.2 6.5 3.2s1.75.79 1.75 1.764S7.466 6.73 6.5 6.73zM19 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 013.667-4.625m4.537-1.533A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-1.875 3.375M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
    </svg>
);

export default function AuthPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoginView, setIsLoginView] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const pageRef = useRef(null);
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const welcomeRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        const currentView = searchParams.get('view');
        if (currentView === 'signup') {
            setIsLoginView(false);
        } else {
            setIsLoginView(true);
        }
    }, [searchParams]);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Container entrance
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
            );

            // Form elements stagger
            const formElements = formRef.current?.querySelectorAll('input, button');
            if (formElements) {
                gsap.fromTo(
                    formElements,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' }
                );
            }

            // Welcome panel slide in
            if (welcomeRef.current) {
                gsap.fromTo(
                    welcomeRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, [isLoginView]);

    const toggleView = () => {
        // Animate out before switching
        gsap.to(formRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            onComplete: () => {
                const nextView = isLoginView ? 'signup' : 'login';
                setSearchParams({ view: nextView });
                // Animate back in
                gsap.to(formRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    delay: 0.1
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event("storage"));
        navigate('/');
    };

    return (
        <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center font-sans py-8 px-4">
            <div ref={containerRef} className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200">

                {/* Form Section (Left Side) */}
                <div className="w-full md:w-1/2 p-8 sm:p-10">
                    <div className="text-center mb-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                            {isLoginView ? 'Welcome Back' : 'Get Started'}
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            {isLoginView ? 'Sign In' : 'Create Account'}
                        </h2>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginView && (
                            <input
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        )}
                        <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                        <div className="relative">
                            <input
                                className="w-full px-4 py-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-slate-600 transition"
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {!isLoginView && (
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-400 hover:text-slate-600 transition"
                                >
                                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        )}
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                            type="submit"
                        >
                            {isLoginView ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm mb-4">or continue with</p>
                        <div className="flex justify-center gap-3">
                            <button className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition">
                                <FacebookIcon />
                            </button>
                            <button className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition">
                                <GoogleIcon />
                            </button>
                            <button className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition">
                                <LinkedinIcon />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Account Toggle */}
                    <div className="mt-6 text-center md:hidden">
                        <button
                            onClick={toggleView}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition"
                        >
                            {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>

                {/* Welcome / Toggle Section (Right Side) */}
                <div ref={welcomeRef} className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-10 text-white text-center">
                    <div>
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            {isLoginView ? 'Hello, Friend!' : 'Welcome Back!'}
                        </h2>
                        <p className="text-blue-100 leading-relaxed mb-8 max-w-xs mx-auto">
                            {isLoginView
                                ? "Start your journey with us and unlock premium test preparation resources."
                                : "Great to see you again! Sign in to continue your learning journey."
                            }
                        </p>
                        <button
                            onClick={toggleView}
                            className="inline-block px-8 py-3 border-2 border-white/80 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300"
                        >
                            {isLoginView ? 'Create Account' : 'Sign In Instead'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}