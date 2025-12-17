import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Award, 
  ChevronRight,
  Plus,
  CheckCircle2
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './CoursesPage.css';

const CoursesPage = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const courses = [
    {
      id: 1,
      title: 'Barista Fundamentals',
      duration: '3 Days',
      price: 'Rs 2000',
      desc: 'Learn espresso basics, milk steaming, and an introduction to latte art.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      title: 'Latte Art Masterclass',
      duration: '1 Day',
      price: 'Rs 2000',
      desc: 'Master hearts, rosettas, tulips and free pour techniques.',
      image: 'https://images.unsplash.com/photo-1534422222019-d81b1b1b1b1?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      title: 'Coffee Cupping & Tasting',
      duration: 'Half-day',
      price: 'Rs 2000',
      desc: 'Explore origin flavors, flavor profiles, and brewing methods.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4,
      title: 'Espresso Machine Workshop',
      duration: '1 Day',
      price: 'Rs 1500',
      desc: 'Deep dive into machine maintenance, calibration, and extraction.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 5,
      title: 'Home Brewing Techniques',
      duration: 'Half-day',
      price: 'Rs 1000',
      desc: 'Perfect your Pour-over, French press, Aeropress, and Cold Brew.',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 6,
      title: 'Cafe Management Basics',
      duration: '5 Days',
      price: 'Rs 2000',
      desc: 'Business planning, daily operations, and customer service excellence.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  return (
    <div className="courses-page">
      <Navbar alwaysDark />

      {/* ── HERO ─────────────────────────────── */}
      <section className="courses-hero">
        <div className="hero-overlay" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Learn the Art of Coffee</h1>
          </motion.div>
        </div>
      </section>

      {/* ── COURSES GRID ───────────────────── */}
      <section className="courses-grid-section container">
        <div className="courses-grid">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              className="course-card"
              {...fadeIn}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="course-img-wrap">
                <img src={course.image} alt={course.title} />
                <div className="price-tag">{course.price}</div>
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <p className="course-desc">{course.desc}</p>
                <button className="enroll-btn" onClick={scrollToForm}>
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REGISTRATION SECTION ──────────────────── */}
      <section className="registration-section" ref={formRef}>
        <div className="container">
          <motion.div className="reg-container" {...fadeIn}>
            <div className="reg-header">
              <h2>Course Registration</h2>
              <p>Fill out the form below to secure your spot.</p>
            </div>

            <form className="reg-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" required />
              </div>
              <div className="form-group">
                <label>Select Course</label>
                <select defaultValue="">
                  <option value="" disabled>Select a course</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select defaultValue="">
                  <option value="" disabled>Select option</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Professional</option>
                </select>
              </div>
              
              <div className="form-full">
                <label className="checkbox-group">
                  <input type="checkbox" required />
                  <span>I agree to the terms and cancellation policy.</span>
                </label>
              </div>

              <button className="submit-reg-btn" type="submit">
                Submit Registration
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;
