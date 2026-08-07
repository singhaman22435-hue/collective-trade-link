import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, MessageSquare, Star, TrendingUp, Plus, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../context/ProductContext';
import { useInquiries } from '../context/InquiryContext';
import './AdminDashboard.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

const AdminDashboard = () => {
  const { products } = useProducts();
  const { inquiries, unreadCount } = useInquiries();
  const featuredCount = products.filter((p) => p.featured).length;
  const recentInquiries = inquiries.slice(0, 5);

  const STATS = [
    { label: 'Total Products', value: products.length, icon: <Package size={24} />, color: '#3b82f6', bg: '#eff6ff', to: '/admin/products' },
    { label: 'Total Inquiries', value: inquiries.length, icon: <MessageSquare size={24} />, color: '#10b981', bg: '#ecfdf5', to: '/admin/inquiries' },
    { label: 'Unread Inquiries', value: unreadCount, icon: <TrendingUp size={24} />, color: '#f59e0b', bg: '#fffbeb', to: '/admin/inquiries' },
    { label: 'Featured Products', value: featuredCount, icon: <Star size={24} />, color: '#8b5cf6', bg: '#f5f3ff', to: '/admin/products' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Administrator. Here's what's happening.</p>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
            <Link to={stat.to} className="stat-card admin-card">
              <div className="stat-card-icon" style={{ background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-card-info">
                <span className="stat-card-value">{stat.value}</span>
                <span className="stat-card-label">{stat.label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Inquiries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="admin-card">
          <div className="admin-card-header">
            <h3>Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="admin-card-link">View All <Eye size={14} /></Link>
          </div>
          {recentInquiries.length === 0 ? (
            <div className="empty-state">
              <MessageSquare size={40} />
              <p>No inquiries yet</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td><strong>{inq.name}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{inq.email}</span></td>
                    <td>{inq.subject || '—'}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {new Date(inq.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <span className={`badge ${inq.read ? 'badge-success' : 'badge-warning'}`}>
                        {inq.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Product Quick View */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="admin-card">
          <div className="admin-card-header">
            <h3>Products</h3>
            <Link to="/admin/products" className="admin-card-link">Manage <Eye size={14} /></Link>
          </div>
          {products.length === 0 ? (
            <div className="empty-state">
              <Package size={40} />
              <p>No products yet</p>
            </div>
          ) : (
            <div className="product-quick-list">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="product-quick-item">
                  <img src={p.image} alt={p.name} className="product-quick-img" />
                  <div className="product-quick-info">
                    <strong>{p.name}</strong>
                    <span className="badge badge-primary">{p.category}</span>
                  </div>
                  {p.featured && <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Featured</span>}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
