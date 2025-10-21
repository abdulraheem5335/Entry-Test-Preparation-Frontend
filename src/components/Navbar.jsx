import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // State now reads from localStorage to persist login status
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Effect to update component if localStorage changes from another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/net', label: 'NET' },
    { to: '/mdcat', label: 'MDCAT' },
    { to: '/nat', label: 'NAT' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    navigate('/'); // Redirect to home on logout
  };

  const navLinkClasses = ({ isActive }) =>
    `font-medium transition-colors hover:text-blue-600 ${
      isActive ? 'text-blue-600' : 'text-gray-700'
    }`;
    
  const mobileNavLinkClasses = ({ isActive }) =>
    `block py-2 text-lg ${
      isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
    }`;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-2xl font-bold text-gray-900">
                EntryPrep
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:gap-8">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth Buttons / Profile */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <img
                    src="https://placehold.co/40x40/3B82F6/FFFFFF?text=A"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                  />
                  <div
                    className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 transition-all duration-300 ease-in-out ${
                      isProfileOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <NavLink to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</NavLink>
                    <NavLink to="/user-info" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">User Info</NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              ) : (
                <>
                  <NavLink to="/auth?view=login" className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50">
                    Login
                  </NavLink>
                  <NavLink to="/auth?view=signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
            
            {/* Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none"
                aria-expanded={open}
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-around">
                    <span className={`block w-full h-0.5 bg-gray-800 transition-transform duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-gray-800 transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-gray-800 transition-transform duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={mobileNavLinkClasses} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {isLoggedIn ? (
                    <div className="space-y-2">
                        <NavLink to="/profile" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}>My Profile</NavLink>
                        <button onClick={() => { handleLogout(); setOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <NavLink to="/auth?view=login" className="flex-1 text-center px-4 py-2 rounded-md font-medium text-blue-600 border border-blue-600 hover:bg-blue-50" onClick={() => setOpen(false)}>
                            Login
                        </NavLink>
                        <NavLink to="/auth?view=signup" className="flex-1 text-center px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
                            Signup
                        </NavLink>
                    </div>
                )}
              </div>
          </div>
        </div>
      </header>
    </>
  );
}

