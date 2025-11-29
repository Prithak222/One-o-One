import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Monitor, 
  Clock, 
  Users, 
  ChevronRight,
  Plus
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './GamesPage.css';

// Assets
import gamingHero from '../assets/gaming-hero.png';

const GamesPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gamePreference, setGamePreference] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [players, setPlayers] = useState('');
  const [duration, setDuration] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');
    setBookingSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          gamePreference,
          date,
          timeSlot,
          players,
          duration
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setGamePreference('');
        setDate('');
        setTimeSlot('');
        setPlayers('');
        setDuration('');
      } else {
        setBookingError(data.message || 'Failed to submit booking request.');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
      setBookingError('Cannot connect to the server. Please check your internet connection.');
    } finally {
      setBookingLoading(false);
    }
  };
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const pricing = [
    { label: '1 Hour', value: 'Rs 100' },
    { label: '3 Hours', value: 'Rs 250' },
    { label: 'Full Day', value: 'Rs 1,200' },
  ];

  const featuredGames = [
    {
      title: 'FC 24',
      desc: 'Challenge your friends in the ultimate football simulation. 4 players available.',
      img: gamingHero // Using hero as placeholder
    },
    {
      title: 'GTA V',
      desc: 'Explore Los Santos in high definition. Dedicated stations available.',
      img: gamingHero // Using hero as placeholder
    },
    {
      title: 'Call of Duty: Warzone',
      desc: 'Deploy, armor up, and battle out. 4 concurrent stations available.',
      img: gamingHero // Using hero as placeholder
    }
  ];

  return (
    <div className="games-page">
      <Navbar alwaysDark />

      {/* ── HERO ─────────────────────────────── */}
      <section className="games-hero">
        <div className="hero-overlay" />
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-icon">
            <Gamepad2 size={64} />
          </div>
          <h1>Game On!</h1>
          <p>Premium gaming lounge with top-tier consoles and PCs.</p>
        </motion.div>
      </section>

      {/* ── FEATURES & PRICING ───────────────── */}
      <section className="games-features container">
        <div className="feature-cards-grid">
          <motion.div className="game-feature-card" {...fadeIn}>
            <div className="feature-icon-wrap">
              <Monitor size={48} />
            </div>
            <h3>High-End Setup</h3>
            <p>4K Monitors, PS5, Xbox Series X, and custom-built gaming PCs.</p>
          </motion.div>

          <motion.div className="game-feature-card" {...fadeIn} transition={{ delay: 0.2 }}>
            <div className="feature-icon-wrap">
              <Users size={48} />
            </div>
            <h3>Group Play</h3>
            <p>Comfortable seating for squads. Food and drinks served right to your action.</p>
          </motion.div>
        </div>

        {/* Pricing */}
        <motion.div className="pricing-section" {...fadeIn}>
          <div className="pricing-title-wrap">
            <Clock size={32} className="feature-icon-wrap" />
            <h3 style={{ fontSize: '1.6rem' }}>Pricing</h3>
          </div>
          <div className="pricing-table">
            {pricing.map((p, i) => (
              <div key={p.label} className="pricing-row">
                <span className="pricing-label">{p.label}</span>
                <span className="pricing-value">{p.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED GAMES ───────────────────── */}
      <section className="featured-games-section container">
        <motion.h2 {...fadeIn}>Featured Games</motion.h2>
        <div className="games-grid">
          {featuredGames.map((game, i) => (
            <motion.div 
              key={game.title} 
              className="game-card"
              {...fadeIn}
              transition={{ delay: i * 0.15 }}
            >
              <div className="game-img-wrap">
                <img src={game.img} alt={game.title} />
              </div>
              <div className="game-info">
                <h3>{game.title}</h3>
                <p>{game.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOOKING SECTION ──────────────────── */}
      <section className="booking-section">
        <div className="container">
          <motion.div className="booking-header" {...fadeIn}>
            <h2>Book a Station</h2>
            <p>Receive your slot to guarantee availability.</p>
          </motion.div>

          <motion.div className="booking-container" {...fadeIn} transition={{ delay: 0.2 }}>
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              {bookingSuccess && (
                <div style={{
                  gridColumn: '1 / -1',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Booking requested successfully! We will contact you soon.
                </div>
              )}

              {bookingError && (
                <div style={{
                  gridColumn: '1 / -1',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  {bookingError}
                </div>
              )}

              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Your full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  disabled={bookingLoading}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  placeholder="Your phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                  disabled={bookingLoading}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={bookingLoading}
                />
              </div>
              <div className="form-group">
                <label>Game Preference</label>
                <select 
                  value={gamePreference} 
                  onChange={(e) => setGamePreference(e.target.value)}
                  required
                  disabled={bookingLoading}
                >
                  <option value="" disabled>Select a game</option>
                  <option value="FC 24 (PS5)">FC 24 (PS5)</option>
                  <option value="GTA V (PC)">GTA V (PC)</option>
                  <option value="Call of Duty (PC)">Call of Duty (PC)</option>
                  <option value="Custom PC Setup">Custom PC Setup</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required 
                  disabled={bookingLoading}
                />
              </div>
              <div className="form-group">
                <label>Time Slot</label>
                <select 
                  value={timeSlot} 
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                  disabled={bookingLoading}
                >
                  <option value="" disabled>Select a timeslot</option>
                  <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 09:00 PM">06:00 PM - 09:00 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Players</label>
                <select 
                  value={players} 
                  onChange={(e) => setPlayers(e.target.value)}
                  required
                  disabled={bookingLoading}
                >
                  <option value="" disabled>How many players?</option>
                  <option value="1 Player">1 Player</option>
                  <option value="2 Players">2 Players</option>
                  <option value="3 Players">3 Players</option>
                  <option value="4+ Players (Squad)">4+ Players (Squad)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  disabled={bookingLoading}
                >
                  <option value="" disabled>How long?</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="2 Hours">2 Hours</option>
                  <option value="3 Hours">3 Hours</option>
                  <option value="Full Day">Full Day</option>
                </select>
              </div>
              <button className="confirm-booking-btn" type="submit" disabled={bookingLoading}>
                {bookingLoading ? 'Submitting Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GamesPage;
