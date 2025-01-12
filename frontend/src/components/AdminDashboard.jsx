import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Banknote, 
  Gamepad2, 
  Utensils, 
  Users, 
  Calendar, 
  Clock, 
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:8000/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStats(data.stats);
      } else {
        setError(data.message || 'Failed to fetch statistics');
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
        }
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format today's date
  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="dashboard-view">
      {/* Header section */}
      <header className="dashboard-view-header">
        <div>
          <h1>Dashboard</h1>
          <p className="current-date-row">
            <Calendar size={16} className="text-gold" />
            <span>{getFormattedDate()}</span>
          </p>
        </div>
        <button className="sync-btn" onClick={fetchStats} disabled={loading} title="Refresh Stats">
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
          <span>Refresh</span>
        </button>
      </header>

      {error && (
        <div className="dashboard-error bg-glass">
          <AlertCircle size={20} className="text-red" />
          <span>{error}</span>
        </div>
      )}

      {loading && !stats ? (
        <div className="dashboard-loading-state">
          <span className="spinner-large" />
          <p>Loading analytics and today's schedule...</p>
        </div>
      ) : (
        <motion.div 
          className="dashboard-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* 4 Analytics metric cards */}
          <div className="metrics-row-grid">
            {/* Game Revenue Card */}
            <motion.div className="metric-icon-card bg-glass" variants={itemVariants}>
              <div className="metric-header-circle bg-gold-gradient">
                <Banknote size={24} />
              </div>
              <div className="metric-body">
                <span>Game Revenue</span>
                <h3>Rs {stats?.revenue || 0}</h3>
                <p className="card-sub-detail">Earned today/total</p>
              </div>
            </motion.div>

            {/* Game Bookings Card */}
            <motion.div className="metric-icon-card bg-glass" variants={itemVariants}>
              <div className="metric-header-circle bg-blue-gradient">
                <Gamepad2 size={24} />
              </div>
              <div className="metric-body">
                <span>Game Bookings Today</span>
                <h3>{stats?.gameBookingsToday || 0}</h3>
                <p className="card-sub-detail text-gold font-semibold">{stats?.upcomingGames || 0} upcoming</p>
              </div>
            </motion.div>

            {/* Table Bookings Card */}
            <motion.div className="metric-icon-card bg-glass" variants={itemVariants}>
              <div className="metric-header-circle bg-green-gradient">
                <Utensils size={24} />
              </div>
              <div className="metric-body">
                <span>Table Bookings Today</span>
                <h3>{stats?.tableBookingsToday || 0}</h3>
                <p className="card-sub-detail text-gold font-semibold">{stats?.confirmedTables || 0} confirmed</p>
              </div>
            </motion.div>

            {/* Guests Expected Card */}
            <motion.div className="metric-icon-card bg-glass" variants={itemVariants}>
              <div className="metric-header-circle bg-purple-gradient">
                <Users size={24} />
              </div>
              <div className="metric-body">
                <span>Guests Today</span>
                <h3>{stats?.guestsToday || 0}</h3>
                <p className="card-sub-detail">Expected diners</p>
              </div>
            </motion.div>
          </div>

          {/* Today's Gaming Queue List */}
          <motion.div className="today-gaming-section bg-glass" variants={itemVariants}>
            <div className="section-head-row">
              <h3>Today's Gaming List</h3>
              <Link to="/admin/games" className="view-all-link">
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {stats?.todayGamingList?.length === 0 ? (
              <div className="dashboard-empty-queue">
                <Gamepad2 size={36} className="text-muted" />
                <p>No active sessions or bookings scheduled for today.</p>
              </div>
            ) : (
              <div className="gaming-queue-list">
                {stats?.todayGamingList?.map((session) => (
                  <div key={session._id} className="queue-item-row">
                    <div className="queue-item-main">
                      <div className="avatar-square bg-dark-roast">
                        <Gamepad2 size={18} className="text-gold" />
                      </div>
                      <div className="queue-item-details">
                        <span className="queue-cust-name">{session.name}</span>
                        <div className="queue-cust-meta">
                          <span className="meta-text">{session.gamePreference}</span>
                          <span className="meta-dot" />
                          <div className="meta-time-wrap">
                            <Clock size={12} />
                            <span>{session.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`status-badge badge-${session.status.toLowerCase().replace(' ', '-')}`}>
                      <span className="badge-dot" />
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
