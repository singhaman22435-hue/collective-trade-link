import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(form.username, form.password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="login-bg-shape shape-a" />
      <div className="login-bg-shape shape-b" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        <div className="login-brand">
          <div className="login-icon-wrap">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="login-title">Admin Panel</h1>
            <p className="login-subtitle">Collective Trade Links</p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="admin-username">Username</label>
            <div className="login-input-wrap">
              <User size={18} className="login-input-icon" />
              <input
                id="admin-username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="login-input-wrap">
              <Lock size={18} className="login-input-icon" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
              />
              <button type="button" className="login-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="login-error">
              {error}
            </motion.div>
          )}

          <button type="submit" className="btn btn-primary w-full login-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Admin'}
          </button>
        </form>

        <div className="login-hint">
          <p>Demo credentials: <strong>admin</strong> / <strong>ctladmin123</strong></p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
