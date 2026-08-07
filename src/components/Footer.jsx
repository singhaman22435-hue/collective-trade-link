import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const productLinks = ['Premium Bearings', 'Linear Motion Systems', 'Pillow & Plummer Blocks', 'Specialty Bearings', 'Industrial Lubricants'];
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Products', to: '/products' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand">
              <img src="/images/logo.jpg" alt="Collective Trade Links" className="footer-logo-img" />
              <span className="footer-brand-name">Collective Trade Links</span>
            </div>
            <p className="footer-description">
              Empowering industrial solutions through trusted distribution and import of premium bearings and motion components since decades.
            </p>
            <div className="footer-tagline">
              <span>Empowering Industrial Solutions</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <ArrowRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Products</h4>
            <ul className="footer-links">
              {productLinks.map((p) => (
                <li key={p}>
                  <Link to="/products">
                    <ArrowRight size={14} />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Get In Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={16} className="footer-icon" />
                <div>
                  <strong>Monil Mehta</strong>
                  <p>+91 9653343336 / +91 9594000246</p>
                </div>
              </li>
              <li>
                <Phone size={16} className="footer-icon" />
                <div>
                  <strong>Nitin Mehta</strong>
                  <p>+91 9323132460 / +91 8591173422</p>
                </div>
              </li>
              <li>
                <Mail size={16} className="footer-icon" />
                <div>
                  <a href="mailto:collectivetradelinks@gmail.com">collectivetradelinks@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Collective Trade Links. All Rights Reserved.</p>
          <Link to="/admin/login" className="footer-admin-link">Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
