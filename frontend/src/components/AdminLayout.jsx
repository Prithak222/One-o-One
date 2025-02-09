import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Coffee, LayoutDashboard, Gamepad2, Utensils, MessageSquare, LogOut } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
    try {
      const response = await fetch('http://localhost:8000/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const unread = data.messages.filter(msg => msg.status === 'Unread').length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    // Poll for new messages every 15 seconds
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Section */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo-container">
            <Coffee className="brand-logo-icon" size={28} />
          </div>
          <div className="brand-text">
            <h2>one O one</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} className="nav-item-icon" />
            <span className="nav-item-text">Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/games" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Gamepad2 size={20} className="nav-item-icon" />
            <span className="nav-item-text">Game Bookings</span>
          </NavLink>

          <NavLink 
            to="/admin/tables" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Utensils size={20} className="nav-item-icon" />
            <span className="nav-item-text">Table Bookings</span>
          </NavLink>

          <NavLink 
            to="/admin/messages" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="nav-item-with-badge">
              <MessageSquare size={20} className="nav-item-icon" />
              {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
            </div>
            <span className="nav-item-text">Messages</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item back-to-site-btn">
            <LogOut size={20} className="nav-item-icon" style={{ transform: 'rotate(180deg)' }} />
            <span className="nav-item-text">Back to Site</span>
          </Link>
          
          <button onClick={handleLogout} className="nav-item sidebar-logout-btn">
            <LogOut size={20} className="nav-item-icon" />
            <span className="nav-item-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <Outlet context={{ fetchUnreadCount }} />
      </main>
    </div>
  );
};

export default AdminLayout;
