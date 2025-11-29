import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleFooterLink = (item) => {
    if (item === 'Home') navigate('/');
    else if (item === 'About us') navigate('/about');
    else if (item === 'Contact us') navigate('/contact');
    else if (item === 'Menu') navigate('/menu');
    // Other links can be added as pages are created
  };

  return (
    <footer className="shared-footer">
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <a href="https://www.instagram.com/oneoone_by_map/" target="_blank" rel="noopener noreferrer" className="footer-logo">One O One</a>
          <p>
            Pokhara's favourite cafe, game lounge, and barista school — all
            under one roof, brewed with love.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/oneoone_by_map/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#fb" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#tw" aria-label="Twitter"><TwitterIcon /></a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {['Home', 'About us', 'Menu', 'Courses', 'Games', 'Contact us'].map((l) => (
              <li key={l} onClick={() => handleFooterLink(l)}>{l}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Visit Us</h4>
          <div className="footer-contact-item">
            <Phone size={16} /> <span>9800000000</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={16} /> <span>hello@oneoonecafe.com</span>
          </div>
          <div className="footer-contact-item">
            <MapPin size={16} /> <span>Pokhara 11, Kaski, Gandaki, Nepal</span>
          </div>
          <div className="footer-map">
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
      </div>

      <div className="footer-bottom">
        <p>© 2025 One O One Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
