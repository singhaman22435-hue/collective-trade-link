import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './Products.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const Products = () => {
  const { products } = useProducts();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Our Catalogue</motion.span>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Our Products</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Explore our diverse range of high-quality industrial motion components.</motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="products-filter-bar">
        <div className="container products-filter-inner">
          {/* Search */}
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className="no-results">
              <Filter size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="product-card card"
                >
                  <div className="product-card-img-wrap">
                    <img src={product.image} alt={product.name} className="product-card-img" />
                    <span className="badge badge-primary product-card-category">{product.category}</span>
                    {product.featured && <span className="badge badge-success product-card-featured">Featured</span>}
                  </div>
                  <div className="product-card-body">
                    <h3>{product.name}</h3>
                    <p>{product.shortDesc}</p>
                    {product.brands && (
                      <div className="product-card-brands">
                        <span className="product-brands-label">Brands:</span>
                        <span>{product.brands}</span>
                      </div>
                    )}
                    <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm product-card-btn">
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
