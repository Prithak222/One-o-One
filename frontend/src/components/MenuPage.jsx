import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import './MenuPage.css';

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('Food');

  const foodCategories = [
    {
      title: 'Breakfast',
      time: '7 AM - 11 AM',
      items: [
        { name: 'Avocado Toast', price: 'Rs 380', desc: 'Sourdough, smashed avocado, cherry tomatoes, poached egg.', tags: ['V'] },
        { name: 'Eggs Benedict', price: 'Rs 480', desc: 'English muffin, poached salmon, hollandaise sauce.', tags: [] },
        { name: 'Pancake Stack', price: 'Rs 350', desc: 'Fluffy pancakes, maple syrup, fresh berries.', tags: ['V'] },
        { name: 'Granola Bowl', price: 'Rs 420', desc: 'House-made granola, Greek yogurt, honey.', tags: ['V', 'GF'] },
        { name: 'French Toast', price: 'Rs 300', desc: 'Brioche, cinnamon, caramelized bananas.', tags: ['V'] },
      ]
    },
    {
      title: 'Lunch',
      time: '11 AM - 4 PM',
      items: [
        { name: 'Club Sandwich', price: 'Rs 520', desc: 'Roasted turkey, bacon, lettuce, tomato, mayo.', tags: [] },
        { name: 'Caesar Salad', price: 'Rs 550', desc: 'Romaine, parmesan, croutons, Caesar dressing.', tags: ['V'] },
        { name: 'Buff Burger', price: 'Rs 680', desc: 'Wagyu beef, cheddar, caramelized onions, fries.', tags: [] },
        { name: 'Grilled Chicken Wrap', price: 'Rs 480', desc: 'Grilled chicken, avocado, spinach, aioli.', tags: [] },
        { name: 'Pasta Carbonara', price: 'Rs 650', desc: 'Spaghetti, pancetta, egg yolk, pecorino.', tags: [] },
      ]
    },
    {
      title: 'Snacks & Desserts',
      time: '',
      items: [
        { name: 'Nachos', price: 'Rs 350', desc: 'Tortilla chips, cheese sauce, jalapeños, salsa.', tags: ['V'] },
        { name: 'Hummus Plate', price: 'Rs 330', desc: 'House hummus, warm pita, veggie sticks.', tags: ['V'] },
        { name: 'Tiramisu', price: 'Rs 450', desc: 'Classic Italian coffee-flavored dessert.', tags: ['V'] },
        { name: 'Cheesecake', price: 'Rs 480', desc: 'New York style with berry compote.', tags: ['V'] },
      ]
    }
  ];

  const beverageCategories = [
    {
      title: 'Coffee',
      items: [
        { name: 'Espresso', price: 'Rs 150', desc: 'Single or double shot of our house blend.', tags: [] },
        { name: 'Americano', price: 'Rs 170', desc: 'Espresso over hot water.', tags: [] },
        { name: 'Cappuccino', price: 'Rs 180', desc: 'Espresso, steamed milk, deep foam.', tags: [] },
        { name: 'Latte', price: 'Rs 250', desc: 'Espresso, steamed milk, light foam.', tags: [] },
        { name: 'Mocha', price: 'Rs 220', desc: 'Espresso, chocolate, steamed milk.', tags: [] },
        { name: 'Flat White', price: 'Rs 280', desc: 'Espresso, velvet-textured milk.', tags: [] },
      ]
    },
    {
      title: 'Specialty & Smoothies',
      items: [
        { name: 'Caramel Frappé', price: 'Rs 270', desc: 'Blended coffee, caramel, whipped cream.', tags: [] },
        { name: 'Matcha Latte', price: 'Rs 350', desc: 'Premium matcha, steamed milk, honey.', tags: [] },
        { name: 'Turmeric Latte', price: 'Rs 220', desc: 'Golden milk with warming spices.', tags: ['GF'] },
        { name: 'Berry Blast', price: 'Rs 320', desc: 'Mixed berries, banana, apple juice.', tags: ['V', 'GF'] },
        { name: 'Green Detox', price: 'Rs 170', desc: 'Spinach, kale, apple, ginger, lemon.', tags: ['V', 'GF'] },
      ]
    },
    {
      title: 'Tea',
      items: [
        { name: 'English Breakfast', price: 'Rs 450', desc: 'Robust black tea blend.', tags: [] },
        { name: 'Green Tea', price: 'Rs 140', desc: 'Sencha green tea leaves.', tags: [] },
        { name: 'Chai Latte', price: 'Rs 280', desc: 'Spiced black tea with steamed milk.', tags: [] },
        { name: 'Mint Tea', price: 'Rs 160', desc: 'Fresh mint leaves, hot water.', tags: [] },
      ]
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <div className="menu-page">
      <Navbar alwaysDark />

      {/* ── HERO ─────────────────────────────── */}
      <section className="menu-hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Menu
        </motion.h1>
      </section>

      {/* ── TABS & LEGEND ─────────────────────────── */}
      <div className="menu-tabs-wrapper container">
        <div className="menu-legend">
          <div className="legend-item">
            <span className="tag-icon">V</span> <span>Vegetarian</span>
          </div>
          <div className="legend-item">
            <span className="tag-icon">GF</span> <span>Gluten-Free</span>
          </div>
        </div>

        <div className="menu-tabs">
          {['Food', 'Beverages'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────── */}
      <section className="menu-content container">
        <AnimatePresence mode="wait">
          {activeTab === 'Food' ? (
            <motion.div key="food-content" {...fadeIn}>
              {foodCategories.map((cat) => (
                <div key={cat.title} className="menu-category">
                  <div className="category-title-wrap">
                    <h2 className="category-title">
                      {cat.title} {cat.time && <span style={{ fontWeight: 400, opacity: 0.6, fontSize: '0.9rem', marginLeft: '0.5rem' }}>({cat.time})</span>}
                    </h2>
                  </div>

                  <div className="items-grid">
                    {cat.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        className="menu-item-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="item-header">
                          <div className="item-name-wrap">
                            <span className="item-name">{item.name}</span>
                            <div className="item-tags">
                              {item.tags.map(tag => (
                                <span key={tag} className="tag-icon">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <span className="item-price">{item.price}</span>
                        </div>
                        <p className="item-desc">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="beverages-content" {...fadeIn}>
              {beverageCategories.map((cat) => (
                <div key={cat.title} className="menu-category">
                  <div className="category-title-wrap">
                    <h2 className="category-title">{cat.title}</h2>
                  </div>

                  <div className="items-grid">
                    {cat.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        className="menu-item-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="item-header">
                          <div className="item-name-wrap">
                            <span className="item-name">{item.name}</span>
                            <div className="item-tags">
                              {item.tags.map(tag => (
                                <span key={tag} className="tag-icon">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <span className="item-price">{item.price}</span>
                        </div>
                        <p className="item-desc">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default MenuPage;
