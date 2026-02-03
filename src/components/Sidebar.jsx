import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// --- Icon Components ---
const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const LayoutGridIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
);

const TrophyIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

const BookIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
);

const SettingsIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const CrownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
);

const GraduationCapIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

const LogOutIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

const MenuIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="18" y2="18" />
    </svg>
);

const XIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
);

/**
 * The main sidebar component with organized sections
 */
export default function ProfileSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    const linkClasses = (path) => `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive(path)
        ? 'bg-blue-50 text-blue-700 font-medium'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`;

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md text-slate-800 hover:bg-slate-50 transition"
                aria-label="Open sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
                   fixed inset-y-0 left-0 z-50 
                   md:sticky md:translate-x-0 md:top-0 md:h-screen
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">User Name</h3>
                            <p className="text-xs text-slate-500">student@email.com</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 text-slate-400 rounded-lg hover:bg-slate-100 md:hidden"
                        aria-label="Close sidebar"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                    {/* Main Section */}
                    <div>
                        <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Main</p>
                        <div className="space-y-1">
                            <Link to="/profile/dashboard" className={linkClasses('/profile/dashboard')}>
                                <LayoutGridIcon className="w-5 h-5" />
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/profile/leaderboard" className={linkClasses('/profile/leaderboard')}>
                                <TrophyIcon className="w-5 h-5" />
                                <span>Leaderboard</span>
                            </Link>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div>
                        <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Courses</p>
                        <div className="space-y-1">
                            <Link to="/profile/course" className={linkClasses('/profile/course')}>
                                <BookIcon className="w-5 h-5" />
                                <span>My Courses</span>
                            </Link>
                            <Link to="/profile/enrolled" className={linkClasses('/profile/enrolled')}>
                                <GraduationCapIcon className="w-5 h-5" />
                                <span>Courses Enrolled</span>
                            </Link>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div>
                        <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Account</p>
                        <div className="space-y-1">
                            <Link to="/profile/account" className={linkClasses('/profile/account')}>
                                <UserIcon className="w-5 h-5" />
                                <span>Profile</span>
                            </Link>
                            <Link to="/profile/settings" className={linkClasses('/profile/settings')}>
                                <SettingsIcon className="w-5 h-5" />
                                <span>Settings</span>
                            </Link>
                        </div>
                    </div>

                    {/* Premium Badge */}
                    <div className="px-2">
                        <Link
                            to="/profile/premium"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                        >
                            <CrownIcon className="w-5 h-5" />
                            <div>
                                <span className="font-semibold block">Go Premium</span>
                                <span className="text-xs text-white/80">Unlock all features</span>
                            </div>
                        </Link>
                    </div>
                </nav>

                {/* Footer / Logout Section */}
                <div className="p-4 border-t border-slate-200">
                    <Link
                        to="/logout"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                        <LogOutIcon className="w-5 h-5" />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
