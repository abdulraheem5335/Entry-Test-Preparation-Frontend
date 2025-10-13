import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/net', label: 'NET' },
    { to: '/mdcat', label: 'MDCAT' },
    { to: '/nat', label: 'NAT' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">EntryPrep</div>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="auth-buttons">
          <NavLink to="/login" className="btn btn-outline">Login</NavLink>
          <NavLink to="/signup" className="btn btn-primary">Signup</NavLink>
        </div>

        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* mobile dropdown (same links duplicated for layout simplicity) */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mobile-auth">
            <NavLink to="/login" className="btn btn-outline" onClick={() => setOpen(false)}>Login</NavLink>
            <NavLink to="/signup" className="btn btn-primary" onClick={() => setOpen(false)}>Signup</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
