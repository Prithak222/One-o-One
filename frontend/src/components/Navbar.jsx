import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = ['Home', 'About us', 'Courses', 'Menu', 'Games', 'Contact us'];

const ROUTE_MAP = {
  'Home': '/',
  'About us': '/about',
  'Contact us': '/contact',
  'Menu': '/menu',
  'Games': '/games',
  'Courses': '/courses',
};

/**
 * alwaysDark: if true the nav is always the dark primary colour (no transparent phase).
 *             Use this on pages without a full-screen hero (e.g. ContactPage).
 */
const Navbar = ({ alwaysDark = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (alwaysDark) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysDark]);

  const isDark = alwaysDark || scrolled;

  const handleNav = (item) => {
    setMenuOpen(false);
    const route = ROUTE_MAP[item];
    if (route) navigate(route);
  };

  const isActive = (item) => {
    if (item === 'Home') return location.pathname === '/';
    if (item === 'Contact us') return location.pathname === '/contact';
    return false;
  };

  return (
    <nav className={`shared-nav${isDark ? ' nav-dark' : ''}`}>
      <div className="shared-nav__container">
        <div className="shared-nav__logo" onClick={() => navigate('/')}>
          ONE O ONE
        </div>

        <ul className={`shared-nav__links${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item}
              className={isActive(item) ? 'active' : ''}
              onClick={() => handleNav(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <button
          className="shared-nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
