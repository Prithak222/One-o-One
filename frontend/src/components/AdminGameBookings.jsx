import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Calendar, 
  Clock, 
  Users, 
  Hourglass, 
  Search, 
  Trash2, 
  XCircle, 
  CheckCircle2, 
  Play, 
  Check, 
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import './AdminGameBookings.css';

const AdminGameBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:8000/admin/bookings/game', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message || 'Failed to fetch game bookings');
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
        }
      }
    } catch (err) {
      console.error('Error fetching game bookings:', err);
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`http://localhost:8000/admin/bookings/game/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBookings(prev => 
          prev.map(b => b._id === id ? { ...b, status: newStatus } : b)
        );
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this game booking record permanently?')) {
      return;
    }
    
    setUpdatingId(id);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`http://localhost:8000/admin/bookings/game/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBookings(prev => prev.filter(b => b._id !== id));
      } else {
        alert(data.message || 'Failed to delete booking');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Error deleting booking. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      b.name.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.email.toLowerCase().includes(query);
      
    const matchesGame = gameFilter === 'All' || b.gamePreference === gameFilter;
    const matchesDate = !dateFilter || b.date === dateFilter;
    
    return matchesSearch && matchesGame && matchesDate;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const upcomingCount = bookings.filter(b => b.status === 'Upcoming').length;
  const inProgressCount = bookings.filter(b => b.status === 'In Progress').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  // Extract unique games for filters
  const uniqueGames = ['All', ...new Set(bookings.map(b => b.gamePreference))];

  return (
    <div className="game-bookings-view">
      <header className="page-header-row">
        <div>
          <h1>Game Bookings</h1>
          <p className="page-subtitle">Manage console and PC station reservations</p>
        </div>
        <button className="sync-btn" onClick={fetchBookings} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
          <span>Sync</span>
        </button>
      </header>

      {/* Metric Cards Row */}
      <div className="bookings-metrics-grid">
        <div className="metric-badge-card bg-glass">
          <div className="metric-badge-icon bg-brown">
            <Gamepad2 size={20} />
          </div>
          <div className="metric-badge-body">
            <h4>Total Bookings</h4>
            <h3>{totalCount}</h3>
          </div>
        </div>

        <div className="metric-badge-card bg-glass">
          <div className="metric-badge-icon bg-yellow">
            <Clock size={20} />
          </div>
          <div className="metric-badge-body">
            <h4>Upcoming</h4>
            <h3>{upcomingCount}</h3>
          </div>
        </div>

        <div className="metric-badge-card bg-glass">
          <div className="metric-badge-icon bg-blue">
            <Play size={20} />
          </div>
          <div className="metric-badge-body">
            <h4>In Progress</h4>
            <h3>{inProgressCount}</h3>
          </div>
        </div>

        <div className="metric-badge-card bg-glass">
          <div className="metric-badge-icon bg-green">
            <Check size={20} />
          </div>
          <div className="metric-badge-body">
            <h4>Completed</h4>
            <h3>{completedCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="filters-control-bar bg-glass">
        <div className="search-box-wrap">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="dropdowns-wrap">
          <div className="filter-select-group">
            <label>Game:</label>
            <select value={gameFilter} onChange={(e) => setGameFilter(e.target.value)}>
              {uniqueGames.map(game => (
                <option key={game} value={game}>{game}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Date:</label>
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {dateFilter && (
              <button className="clear-date-btn" onClick={() => setDateFilter('')}>Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-card-container bg-glass">
        {loading && bookings.length === 0 ? (
          <div className="loading-state">
            <span className="spinner-large" />
            <p>Fetching gaming records...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="sync-btn" onClick={fetchBookings}>Retry</button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-state">
            <Gamepad2 size={40} className="text-muted" />
            <p>No matching game bookings found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="bookings-data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Game Preference</th>
                  <th>Date & Time</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((b) => (
                    <motion.tr 
                      key={b._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={updatingId === b._id ? 'row-updating' : ''}
                    >
                      <td>
                        <div className="customer-info-cell">
                          <span className="cust-name">{b.name}</span>
                          <span className="cust-phone">{b.phone}</span>
                          <span className="cust-email">{b.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="station-cell">
                          <Gamepad2 size={14} className="table-row-icon" />
                          <span>{b.gamePreference}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-time-cell">
                          <div className="row-sub-cell">
                            <Calendar size={12} className="table-sub-icon" />
                            <span>{b.date}</span>
                          </div>
                          <div className="row-sub-cell text-muted">
                            <Clock size={12} className="table-sub-icon" />
                            <span>{b.timeSlot}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="party-duration-cell">
                          <div className="row-sub-cell">
                            <Users size={12} className="table-sub-icon" />
                            <span>{b.players}</span>
                          </div>
                          <div className="row-sub-cell">
                            <Hourglass size={12} className="table-sub-icon" />
                            <span>{b.duration}</span>
                          </div>
                          {b.price > 0 && (
                            <div className="row-sub-cell text-gold font-semibold">
                              <span>Rs {b.price}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge badge-${b.status.toLowerCase().replace(' ', '-')}`}>
                          <span className="badge-dot" />
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions-button-group">
                          {b.status === 'Upcoming' && (
                            <button 
                              className="action-icon-btn run-btn"
                              onClick={() => handleUpdateStatus(b._id, 'In Progress')}
                              disabled={updatingId !== null}
                              title="Start Session"
                            >
                              <Play size={14} />
                            </button>
                          )}
                          {b.status === 'In Progress' && (
                            <button 
                              className="action-icon-btn done-btn"
                              onClick={() => handleUpdateStatus(b._id, 'Completed')}
                              disabled={updatingId !== null}
                              title="Complete Session"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                            <button 
                              className="action-icon-btn cancel-btn"
                              onClick={() => handleUpdateStatus(b._id, 'Cancelled')}
                              disabled={updatingId !== null}
                              title="Cancel Session"
                            >
                              <XCircle size={14} />
                            </button>
                          )}
                          <button 
                            className="action-icon-btn delete-btn"
                            onClick={() => handleDeleteBooking(b._id)}
                            disabled={updatingId !== null}
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGameBookings;
