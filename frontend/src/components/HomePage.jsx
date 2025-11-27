import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Coffee,
  ChevronDown,
  Star,
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './HomePage.css';
import heroBg from '../assets/hero-bg.png';
import caramelLatte from '../assets/caramel-latte.png';
import espresso from '../assets/espresso.png';
import matchaLatte from '../assets/matcha-latte.png';
import coldBrew from '../assets/cold-brew.png';


const brews = [
  { id: 1, name: 'Caramel Latte', price: 'Rs. 270', image: caramelLatte, tag: 'Bestseller' },
  { id: 2, name: 'Espresso', price: 'Rs. 145', image: espresso, tag: 'Classic' },
  { id: 3, name: 'Matcha Latte', price: 'Rs. 320', image: matchaLatte, tag: 'New' },
  { id: 4, name: 'Cold Brew', price: 'Rs. 280', image: coldBrew, tag: 'Trending' },
];

const features = [
  {
    icon: <Coffee size={32} />,
    title: 'Premium Beans',
    desc: "Sourced from the world's finest highland farms, hand-picked and expertly roasted.",
  },
  {
    icon: <Star size={32} />,
    title: 'Expert Baristas',
    desc: 'Our passionate specialists craft each cup with precision and artistic flair.',
  },
  {
    icon: <Heart size={32} />,
    title: 'Cozy Atmosphere',
    desc: 'A haven for students, professionals, and coffee lovers alike — always welcoming.',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleFooterLink = (item) => {
    if (item === 'Home') navigate('/');
    else if (item === 'Contact us') navigate('/contact');
  };
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: 'easeOut' },
  };

  return (
    <div className="home-page">
      {/* ── NAV ──────────────────────────────── */}
      <Navbar />

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="hero-tagline">Where Coffee Meets Community</p>
            <h1>
              Welcome to{' '}
              <span className="brand-name">
                One O One<span className="cafe-text"> CAFE</span>
              </span>
            </h1>
            <div className="hero-actions">
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/menu')}
              >
                <Coffee size={18} /> Our Menu
              </motion.button>
              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/reservation')}
              >
                Make a Reservation
              </motion.button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>

        {/* Floating announcement */}
        <div className="hero-announcement">
          <span className="announcement-dot" />
          <span>When Coffee Writes Stories</span>
          <motion.button className="btn-announcement" whileHover={{ scale: 1.05 }}>
            Subscribe
          </motion.button>
        </div>
      </section>

      {/* ── SIGNATURE BREWS ──────────────────── */}
      <section className="brews-section">
        <div className="container">
          <motion.div className="section-header" {...fadeUp}>
            <h2>Signature Brews</h2>
            <div className="accent-line" />
          </motion.div>

          <div className="brews-grid">
            {brews.map((brew, i) => (
              <motion.div
                key={brew.id}
                className="brew-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <div className="brew-image-wrap">
                  <img src={brew.image} alt={brew.name} className="brew-image" />
                  <span className="brew-tag">{brew.tag}</span>
                </div>
                <div className="brew-info">
                  <h3>{brew.name}</h3>
                  <span className="brew-price">{brew.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ───────────────────── */}
      <section className="features-section">
        <div className="container features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LEVEL UP YOUR BREAK ──────────────── */}
      <section className="break-section">
        <div className="container break-grid">
          <motion.div className="break-text" {...fadeUp}>
            <div className="chat-bubble-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2>Level Up Your Break</h2>
            <p>
              An oasis at the edge of the old gaming district. One O One Cafe isn't just a
              coffee house — it's a hub where creators, coders, artists, and dreamers come
              to fuel their best work.
            </p>
            <motion.button
              className="btn btn-accent"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Gaming Lounge <ArrowRight size={18} />
            </motion.button>
          </motion.div>
          <motion.div
            className="break-image-wrap"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={heroBg} alt="Cafe interior" className="break-image" />
            <div className="break-image-overlay" />
          </motion.div>
        </div>
      </section>

      {/* ── MASTER THE ART ───────────────────── */}
      <section className="art-section">
        <div className="container art-content">
          <motion.div {...fadeUp}>
            <h2>Master the Art of Coffee</h2>
            <p>
              Join our hands-on barista courses designed for beginners and enthusiasts alike.
              Learn brewing techniques, latte art, and café management from professionals.
            </p>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Courses
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <Footer />
    </div>
  );
};

export default HomePage;
