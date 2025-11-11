import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// --- Icon Components ---
const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.219,44,30.556,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-6 h-6" fill="#0A66C2" viewBox="0 0 24 24" aria-hidden="true">
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
    useEffect(()=>{
        scrollTo(0,0);
    },[])    
    const navigate = useNavigate();

    useEffect(() => {
        const currentView = searchParams.get('view');
        if (currentView === 'signup') {
            setIsLoginView(false);
        } else {
            setIsLoginView(true);
        }
    }, [searchParams]);

    const toggleView = () => {
        const nextView = isLoginView ? 'signup' : 'login';
        setSearchParams({ view: nextView });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event("storage"));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
            <div className="w-full max-w-4xl m-4 bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
                
                {/* Form Section (Left Side) */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 text-gray-800">
                    <h2 className="text-4xl font-bold mb-8 text-center">{isLoginView ? 'Signin' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLoginView && (
                            <div className="mb-5">
                                <input className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Full Name" required />
                            </div>
                        )}
                        <div className="mb-5">
                            <input className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email Address" required />
                        </div>
                        <div className="mb-5 relative">
                            <input className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type={showPassword ? 'text' : 'password'} placeholder="Password" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {!isLoginView && (
                            <div className="mb-8 relative">
                                <input className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" required />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700">
                                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        )}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 shadow-lg" type="submit">
                            {isLoginView ? 'Signin' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 mb-4">or {isLoginView ? 'signin' : 'signup'} with</p>
                        <div className="flex justify-center space-x-4">
                            <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition"><FacebookIcon /></button>
                            <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition"><GoogleIcon /></button>
                            <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition"><LinkedinIcon /></button>
                        </div>
                    </div>
                </div>

                {/* Welcome / Toggle Section (Right Side) */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-10 text-white text-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">{isLoginView ? 'Hello, Friend!' : 'Welcome Back!'}</h2>
                        <p className="text-blue-200 leading-relaxed mb-8">
                            {isLoginView
                                ? "Enter your personal details and start your journey with us. We're excited to have you on board."
                                : "We're happy to see you again. Enter your details to continue where you left off."
                            }
                        </p>
                        <button onClick={toggleView} className="inline-block px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
                            {isLoginView ? 'No account yet? Signup.' : 'Already have an account? Signin.'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}