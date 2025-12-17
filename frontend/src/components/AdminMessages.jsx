import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Trash2, 
  Check, 
  Mail, 
  Phone, 
  User, 
  Tag, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import './AdminMessages.css';

const AdminMessages = () => {
  const navigate = useNavigate();
  const { fetchUnreadCount } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Selected message details modal
  const [activeMessage, setActiveMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('http://localhost:8000/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setMessages(data.messages);
      } else {
        setError(data.message || 'Failed to fetch messages');
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
        }
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Cannot connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    setUpdatingId(id);
    const token = localStorage.getItem('adminToken');
    const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    
    try {
      const response = await fetch(`http://localhost:8000/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setMessages(prev => 
          prev.map(m => m._id === id ? { ...m, status: newStatus } : m)
        );
        // Refresh sidebar unread count
        fetchUnreadCount();
        
        // Update active message modal details if open
        if (activeMessage && activeMessage._id === id) {
          setActiveMessage(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(data.message || 'Failed to update message status');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      alert('Error updating status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message permanently?')) {
      return;
    }
    
    setUpdatingId(id);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`http://localhost:8000/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
        if (activeMessage && activeMessage._id === id) {
          setActiveMessage(null);
        }
        fetchUnreadCount();
      } else {
        alert(data.message || 'Failed to delete message');
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Error deleting message. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenMessage = async (message) => {
    setActiveMessage(message);
    if (message.status === 'Unread') {
      // Auto mark as Read when opened
      await handleToggleStatus(message._id, 'Unread');
    }
  };

  return (
    <div className="messages-view">
      <header className="page-header-row">
        <div>
          <h1>Messages</h1>
          <p className="page-subtitle">Read and manage client contact submissions</p>
        </div>
        <button className="sync-btn" onClick={fetchMessages} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
          <span>Sync</span>
        </button>
      </header>

      <div className="messages-layout-grid">
        {/* Messages List Panel */}
        <div className="messages-list-card bg-glass">
          {loading && messages.length === 0 ? (
            <div className="loading-state">
              <span className="spinner-large" />
              <p>Loading inbox...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button className="sync-btn" onClick={fetchMessages}>Retry</button>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <MessageSquare size={40} className="text-muted" />
              <p>Inbox is empty.</p>
            </div>
          ) : (
            <div className="messages-inbox-scroller">
              {messages.map((m) => (
                <div 
                  key={m._id} 
                  className={`inbox-item-row ${m.status === 'Unread' ? 'unread-item' : ''} ${activeMessage?._id === m._id ? 'active-item' : ''}`}
                  onClick={() => handleOpenMessage(m)}
                >
                  <div className="inbox-item-dot-container">
                    {m.status === 'Unread' && <span className="unread-dot-indicator" />}
                  </div>
                  <div className="inbox-item-content">
                    <div className="inbox-item-meta">
                      <span className="inbox-sender-name">{m.name}</span>
                      <span className="inbox-time">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="inbox-subject">{m.subject}</h4>
                    <p className="inbox-snippet">{m.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail Viewer Panel */}
        <div className="message-viewer-card bg-glass">
          {activeMessage ? (
            <div className="message-viewer-full">
              <div className="viewer-header">
                <h2>{activeMessage.subject}</h2>
                <div className="viewer-actions">
                  <button 
                    className="action-icon-btn toggle-read-btn"
                    onClick={() => handleToggleStatus(activeMessage._id, activeMessage.status)}
                    disabled={updatingId !== null}
                    title={activeMessage.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}
                  >
                    {activeMessage.status === 'Unread' ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>{activeMessage.status === 'Unread' ? 'Mark Read' : 'Mark Unread'}</span>
                  </button>
                  <button 
                    className="action-icon-btn delete-btn"
                    onClick={() => handleDeleteMessage(activeMessage._id)}
                    disabled={updatingId !== null}
                    title="Delete Message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="sender-profile-strip">
                <div className="sender-avatar">
                  <User size={18} />
                </div>
                <div className="sender-details">
                  <h3>{activeMessage.name}</h3>
                  <div className="sender-contact-methods">
                    <div className="contact-item">
                      <Mail size={12} />
                      <span>{activeMessage.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={12} />
                      <span>{activeMessage.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="message-body-text">
                <p>{activeMessage.message}</p>
              </div>
            </div>
          ) : (
            <div className="viewer-placeholder">
              <MessageSquare size={48} className="text-gold" />
              <h3>No Message Selected</h3>
              <p>Choose an item from the inbox list to read it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
