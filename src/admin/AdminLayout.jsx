import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../context/InquiryContext';
import './AdminLayout.css';

const NAV = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/admin/products', icon: <Package size={20} />, label: 'Products' },
  { to: '/admin/inquiries', icon: <MessageSquare size={20} />, label: 'Inquiries' },
];

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const { unreadCount } = useInquiries();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/logo.jpg" alt="CTL Logo" className="sidebar-logo" />
          <div>
            <span className="sidebar-brand-name">CTL Admin</span>
            <span className="sidebar-version">v2.0</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? 'sidebar-link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.label === 'Inquiries' && unreadCount > 0 && (
                <span className="sidebar-badge">{unreadCount}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-public-link" target="_blank">
            View Public Site <ChevronRight size={14} />
          </Link>
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <button className="topbar-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="topbar-title">
            {NAV.find((n) => n.to === location.pathname)?.label || 'Admin Panel'}
          </div>
          <div className="topbar-right">
            <div className="topbar-user">
              <div className="topbar-avatar">A</div>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
