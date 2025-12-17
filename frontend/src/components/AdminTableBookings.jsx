import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  Trash2, 
  XCircle, 
  CheckCircle2, 
  RefreshCw,
  Gift,
  Check
} from 'lucide-react';
import './AdminTableBookings.css';

const AdminTableBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:8000/admin/bookings/table', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message || 'Failed to fetch table bookings');
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
        }
      }
    } catch (err) {
      console.error('Error fetching table bookings:', err);
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
      const response = await fetch(`http://localhost:8000/admin/bookings/table/${id}`, {
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
    if (!window.confirm('Delete this table reservation permanently?')) {
      return;
    }
    
    setUpdatingId(id);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`http://localhost:8000/admin/bookings/table/${id}`, {
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
      b.email.toLowerCase().includes(query) ||
      (b.occasion && b.occasion.toLowerCase().includes(query));
      
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  return (
    <div className="table-bookings-view">
      <header className="page-header-row">
        <div>
          <h1>Table Bookings</h1>
          <p className="page-subtitle">Manage guest reservations and table seatings</p>
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
            <Utensils size={20} />
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
            <h4>Pending</h4>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="metric-badge-card bg-glass">
          <div className="metric-badge-icon bg-blue">
            <CheckCircle2 size={20} />
          </div>
          <div className="metric-badge-body">
            <h4>Confirmed</h4>
            <h3>{confirmedCount}</h3>
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

      {/* Search and Filters Section */}
      <div className="filters-control-bar bg-glass">
        <div className="search-box-wrap">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by customer, phone, email, occasion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="dropdowns-wrap">
          <div className="filter-select-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-card-container bg-glass">
        {loading && bookings.length === 0 ? (
          <div className="loading-state">
            <span className="spinner-large" />
            <p>Fetching table records...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="sync-btn" onClick={fetchBookings}>Retry</button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-state">
            <Utensils size={40} className="text-muted" />
            <p>No matching table reservations found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="bookings-data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Guests</th>
                  <th>Date & Time</th>
                  <th>Occasion</th>
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
                          <Users size={16} className="table-row-icon" />
                          <span>{b.guests} Guests</span>
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
                            <span>{b.time}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="station-cell">
                          <Gift size={14} className="table-row-icon" />
                          <span>{b.occasion || 'None'}</span>
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
                          {b.status === 'Pending' && (
                            <button 
                              className="action-icon-btn done-btn"
                              onClick={() => handleUpdateStatus(b._id, 'Confirmed')}
                              disabled={updatingId !== null}
                              title="Confirm Reservation"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {b.status === 'Confirmed' && (
                            <button 
                              className="action-icon-btn done-btn"
                              onClick={() => handleUpdateStatus(b._id, 'Completed')}
                              disabled={updatingId !== null}
                              title="Complete Reservation"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                            <button 
                              className="action-icon-btn cancel-btn"
                              onClick={() => handleUpdateStatus(b._id, 'Cancelled')}
                              disabled={updatingId !== null}
                              title="Cancel Reservation"
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

export default AdminTableBookings;
