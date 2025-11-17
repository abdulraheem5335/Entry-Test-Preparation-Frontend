import React, { useState } from 'react';

// import Dashboard from '../pages/Dashboard.jsx'; // This import wasn't used, so I've commented it out.

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

const Book = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    <line x1="14" x2="20" y1="6" y2="6" />
    <line x1="14" x2="20" y1="10" y2="10" />
    <line x1="10" x2="20" y1="14" y2="14" />
    <line x1="10" x2="20" y1="18" y2="18" />
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
 * The main sidebar component, now mobile-friendly.
 */
export default function ProfileSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkClasses = "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors";

  return (
    <>
      {/* Mobile Hamburger Button */}
      {/* This button is only visible on mobile (md:hidden) and floats on top */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md text-gray-800"
        aria-label="Open sidebar"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {/* This appears only on mobile when the sidebar is open, and closes the sidebar when clicked */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col transition-transform duration-300 ease-in-out
                   fixed inset-y-0 left-0 z-50 
                   md:sticky md:translate-x-0
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button for mobile, inside the sidebar */}
        <div className="flex justify-end p-2 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation Section */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Use <a> tags for navigation without client-side routing */}
          <a href="/profile/dashboard" className={linkClasses}>
            <LayoutGridIcon className="w-5 h-5" />
            <span className="text-xl">Dashboard</span>
          </a>
          <a href="/profile/account" className={linkClasses}>
            <UserIcon className="w-5 h-5" />
            <span className="text-xl">Account</span>
          </a>
          <a href="/profile/leaderboard" className={linkClasses}>
            <TrophyIcon className="w-5 h-5" />
            <span className="text-xl">Leaderboard</span>
          </a>
          <a href="/profile/course" className={linkClasses}>
            <Book className="w-5 h-5" />
            <span className="text-xl">Course</span>
          </a>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          <a href="/logout" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <LogOutIcon className="w-5 h-5" />
            <span className="text-xl">Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
}