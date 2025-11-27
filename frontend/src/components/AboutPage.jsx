import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Users, 
  Lightbulb, 
  Leaf, 
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutPage.css';

// Assets
import pouringCoffeeImg from '../assets/pouring-coffee-about.png';
import team1 from '../assets/team-member-1.png';
import team2 from '../assets/team-member-2.png';
import team3 from '../assets/team-member-3.png';
import team4 from '../assets/team-member-4.png';

const AboutPage = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const values = [
    {
      icon: <Coffee size={40} />,
      title: 'Purity',
      desc: 'We source only the highest grade single-origin beans, ensuring a pure and unadulterated coffee experience.'
    },
    {
      icon: <Users size={40} />,
      title: 'Community',
      desc: 'Our space is designed to be a hub for creators, students, and professionals to connect and grow together.'
    },
    {
      icon: <Lightbulb size={40} />,
      title: 'Innovation',
      desc: 'Through our barista school, we innovate brewing techniques and share the art of coffee with the world.'
    },
    {
      icon: <Leaf size={40} />,
      title: 'Sustainability',
      desc: 'Every cup supports ethical sourcing and sustainable farming practices in the highlands of Nepal.'
    }
  ];

  const team = [
    {
      name: 'Maya Sharma',
      role: 'Founder & CEO',
      img: team1
    },
    {
      name: 'David Wilson',
      role: 'Head of Coffee',
      img: team2
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Lead Barista',
      img: team3
    },
    {
      name: 'Marcus Chen',
      role: 'Operations Manager',
      img: team4
    }
  ];

  const journey = [
    {
      year: '2019',
      title: 'The Beginning',
      desc: 'One O One Cafe opened its doors as a small popup in the heart of Pokhara.'
    },
    {
      year: '2020',
      title: 'Facing Challenges',
      desc: 'Successfully pivoted to local delivery and built a loyal community during the pandemic.'
    },
    {
      year: '2021',
      title: 'Expansion',
      desc: 'Moved to our current flagship location and launched the Barista Academy.'
    },
    {
      year: '2022',
      title: 'New Horizons',
      desc: 'Introduced the Gaming Lounge, blending the worlds of coffee and digital culture.'
    },
    {
      year: '2023',
      title: 'Community Hub',
      desc: 'Recognized as the leading creative space for students and entrepreneurs in Pokhara.'
    }
  ];

  return (
    <div className="about-page">
      <Navbar alwaysDark />

      {/* ── HERO ─────────────────────────────── */}
      <section className="about-hero">
        <div className="hero-overlay" />
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Our Story
        </motion.h1>
      </section>

      {/* ── STORY ────────────────────────────── */}
      <section className="story-section container">
        <div className="story-grid">
          <motion.div className="story-image-wrap" {...fadeIn}>
            <img src={pouringCoffeeImg} alt="Barista pouring coffee" className="story-image" />
          </motion.div>
          <motion.div className="story-content" {...fadeIn} transition={{ delay: 0.2 }}>
            <h2>More Than Just Coffee</h2>
            <p>
              Founded in 2019, One O One Cafe began with a simple vision: to bring world-class coffee standards to the heart of Pokhara. We believed that coffee was more than just a morning ritual — it was a medium for connection.
            </p>
            <p>
              Over the years, we've evolved from a small coffee shop into a multifaceted destination where you'll find the finest specialty brews, a high-tech gaming lounge, and an academy dedicated to the craft of the barista.
            </p>
            <p>
              Our mission is to create a haven where your passion for coffee meets your creative spark. Every cup we serve is a testament to our commitment to quality, community, and the art of the brew.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────── */}
      <section className="values-section">
        <div className="container">
          <motion.h2 {...fadeIn}>Our Values</motion.h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div 
                key={v.title} 
                className="value-card"
                {...fadeIn}
                transition={{ delay: i * 0.15 }}
              >
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────── */}
      <section className="team-section container">
        <motion.h2 {...fadeIn}>Meet The Team</motion.h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <motion.div 
              key={m.name} 
              className="team-card"
              {...fadeIn}
              transition={{ delay: i * 0.12 }}
            >
              <div className="team-img-wrap">
                <img src={m.img} alt={m.name} />
              </div>
              <div className="team-info">
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────── */}
      <section className="journey-section">
        <div className="container">
          <motion.h2 {...fadeIn}>Our Journey</motion.h2>
          <div className="journey-timeline">
            {journey.map((item, i) => (
              <motion.div 
                key={item.year} 
                className="journey-item"
                {...fadeIn}
                transition={{ delay: i * 0.15 }}
              >
                <div className="journey-year">{item.year}</div>
                <div className="journey-desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="about-cta">
        <div className="container">
          <motion.div {...fadeIn}>
            <h2>Be Part of Our Story</h2>
            <p>Visit us today or get in touch for custom events and barista workshops.</p>
            <button className="cta-btn" onClick={() => navigate('/contact')}>
              Contact Us <ArrowRight size={20} style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
