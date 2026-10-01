import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 60);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const mainLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <img src="/images/logo.jpg" alt="Collective Trade Links" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-name">Collective Trade Links</span>
              <span className="brand-tagline">Industrial Solutions</span>
            </div>
          </Link>

          <nav className={`navbar-nav ${isOpen ? 'nav--open' : ''}`}>
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="nav-dropdown">
              <button className={`nav-link dropdown-toggle ${(location.pathname === '/finder' || location.pathname === '/doctor') ? 'nav-link--active' : ''}`}>
                Tools <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }}/>
              </button>
              <div className="dropdown-menu">
                <Link to="/finder" className="dropdown-item">Bearing Finder</Link>
                <Link to="/doctor" className="dropdown-item">Bearing Doctor</Link>
              </div>
            </div>

            {/* Brands Dropdown */}
            <div className="nav-dropdown">
              <button className={`nav-link dropdown-toggle ${location.pathname === '/cnz-bearings' ? 'nav-link--active' : ''}`}>
                Brands <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }}/>
              </button>
              <div className="dropdown-menu">
                <Link to="/cnz-bearings" className="dropdown-item">CNZ Bearings</Link>
              </div>
            </div>

            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'nav-link--active' : ''}`}
            >
              Contact Us
            </Link>

            <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
              Get Quote <ChevronRight size={16} />
            </Link>
          </nav>

          <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;
