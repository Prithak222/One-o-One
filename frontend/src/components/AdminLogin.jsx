import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Coffee, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.user.username);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login request error:', err);
      setError('Cannot connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <Navbar alwaysDark />

      <div className="login-hero-bg" />

      <div className="login-container container">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="login-card-header">
            <div className="login-logo-circle">
              <Coffee size={36} className="login-icon" />
            </div>
            <h2>Staff Portal</h2>
            <p>Enter credentials to access booking panel</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="login-error-alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label>Username</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon-left" />
                <input
                  type="text"
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="login-form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              className={`login-submit-btn ${loading ? 'btn-loading' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Log In <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
