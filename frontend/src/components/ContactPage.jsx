import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  User, 
  ChevronDown, 
  Clock,
  Send
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Cannot connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <Navbar alwaysDark />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Get in Touch</h1>
          <div className="accent-underline"></div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container main-content">
        <div className="contact-grid">
          {/* Form Section */}
          <motion.section 
            className="form-section card"
            {...fadeInUp}
          >
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              {success && (
                <div style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {error && (
                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {error}
                </div>
              )}

              <div className="input-group">
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="input-group">
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper select-wrapper">
                  <MessageSquare className="input-icon" size={20} />
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    disabled={loading}
                  >
                    <option value="" disabled>Subject</option>
                    <option value="Reservation">Reservation</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                  <ChevronDown className="select-arrow" size={16} />
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper textarea-wrapper">
                  <MessageSquare className="input-icon" size={20} />
                  <textarea 
                    placeholder="Message" 
                    rows="5" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={loading}
                  ></textarea>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'} <Send size={18} style={{ marginLeft: '8px' }} />
              </motion.button>
            </form>
          </motion.section>


          {/* Info Section */}
          <aside className="info-section">
            <motion.div 
              className="info-card address-card card"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="icon-badge">
                <MapPin size={24} />
              </div>
              <div className="card-body">
                <h3>Address</h3>
                <p>Pokhara 11, Kaski, Gandaki, Nepal</p>
                <div className="map-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.669761116518!2d83.99589019999999!3d28.217344299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995950070dc4209%3A0x6582ba6e842c4832!2sCafe%20one%20o%20one!5e0!3m2!1sen!2snp!4v1775797659398!5m2!1sen!2snp" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="One O One Cafe Location"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            <div className="sub-grid">
              <motion.div 
                className="info-card quick-contact card"
                {...fadeInUp}
                transition={{ delay: 0.3 }}
              >
                <Phone size={20} />
                <div className="card-body">
                  <h3>Phone</h3>
                  <p>9800000000</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-card quick-contact card"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                <MessageSquare size={20} />
                <div className="card-body">
                  <h3>WhatsApp</h3>
                  <p className="link">Chat with us</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-card quick-contact card"
                {...fadeInUp}
                transition={{ delay: 0.5 }}
              >
                <Mail size={20} />
                <div className="card-body">
                  <h3>Email</h3>
                  <p className="link">hello@oneoonecafe.com</p>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Operating Hours Banner */}
      <motion.section 
        className="hours-banner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container banner-content">
          <Clock className="banner-icon" size={32} />
          <div className="hours-row">
            <div className="hours-item">
              <span className="label">Cafe Hours:</span>
              <span className="time">7:00 AM - 9:30 PM</span>
            </div>
            <div className="hours-divider"></div>
            <div className="hours-item">
              <span className="label">Kitchen Hours:</span>
              <span className="time">9:00 AM - 9:30 PM</span>
            </div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default ContactPage;
