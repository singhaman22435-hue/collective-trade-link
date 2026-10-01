import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Factory, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CNZBearings.css';

const CNZBearings = () => {
  return (
    <div className="cnz-page">
      {/* CNZ Hero Section */}
      <section className="cnz-hero">
        <div className="cnz-hero-bg"></div>
        <div className="container cnz-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="cnz-badge">
              Our Sister Company
            </div>
            <h1 className="cnz-hero-title">
              CNZ <span>Bearings</span>
            </h1>
            <p className="cnz-hero-desc">
              ISO 9001:2015 QMS Certified. A global leader in Sliding Bush Bearings, Linear Motion Products, and Slewing Rings. Partnered with Collective Trade Links to deliver unparalleled quality across India.
            </p>
            <div className="cnz-hero-actions">
              <a href="#products" className="btn btn-ghost" style={{ background: 'white', color: '#0f172a' }}>
                Explore Products
              </a>
              <Link to="/contact" className="btn btn-outline" style={{ color: 'white', borderColor: '#475569' }}>
                Contact Sales
              </Link>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="cnz-hero-graphic">
            <div className="cnz-graphic-glow"></div>
            <div className="cnz-graphic-box">
              <span className="cnz-graphic-text">CNZ LOGO</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="cnz-features">
        <div className="container">
          <div className="cnz-feature-grid">
            <div className="cnz-feature-card">
              <div className="cnz-feature-icon">
                <ShieldCheck size={32} />
              </div>
              <h3 className="cnz-feature-title">ISO 9001:2015 Certified</h3>
              <p className="cnz-feature-desc">Committed to rigorous quality management standards ensuring reliable and durable components.</p>
            </div>
            <div className="cnz-feature-card">
              <div className="cnz-feature-icon">
                <Factory size={32} />
              </div>
              <h3 className="cnz-feature-title">Advanced Manufacturing</h3>
              <p className="cnz-feature-desc">State-of-the-art facilities producing precision-engineered linear motion and slewing rings.</p>
            </div>
            <div className="cnz-feature-card">
              <div className="cnz-feature-icon">
                <Award size={32} />
              </div>
              <h3 className="cnz-feature-title">Global Excellence</h3>
              <p className="cnz-feature-desc">Trusted by top industries worldwide for innovation, performance, and longevity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="cnz-products">
        <div className="container">
          <div className="cnz-products-header">
            <span className="cnz-products-label">Product Lines</span>
            <h2 className="cnz-products-title">Engineered for Precision</h2>
            <p className="cnz-products-desc">
              Discover the specialized product categories manufactured by CNZ Bearings, designed to meet the toughest industrial demands.
            </p>
          </div>

          <div className="cnz-category-grid">
            {/* Category 1 */}
            <div className="cnz-cat-card">
              <div className="cnz-cat-img-wrap">
                 <div className="cnz-cat-overlay"></div>
                 <div className="cnz-cat-header">
                   <h3>Sliding Bush Bearings</h3>
                 </div>
              </div>
              <div className="cnz-cat-body">
                <p>
                  Self-lubricating sliding bush bearings designed for high load capacity and excellent wear resistance. Ideal for heavy machinery and automotive applications.
                </p>
                <Link to="/finder" className="cnz-cat-link">
                  Search Inventory <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="cnz-cat-card">
              <div className="cnz-cat-img-wrap">
                 <div className="cnz-cat-overlay"></div>
                 <div className="cnz-cat-header">
                   <h3>Linear Motion</h3>
                 </div>
              </div>
              <div className="cnz-cat-body">
                <p>
                  Precision linear guideways, ball screws, and shafts providing smooth, low-friction movement for CNC and automation equipment.
                </p>
                <Link to="/finder" className="cnz-cat-link">
                  Search Inventory <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="cnz-cat-card">
              <div className="cnz-cat-img-wrap">
                 <div className="cnz-cat-overlay"></div>
                 <div className="cnz-cat-header">
                   <h3>Slewing Rings</h3>
                 </div>
              </div>
              <div className="cnz-cat-body">
                <p>
                  Large-diameter slewing ring bearings for heavy load support and rotation, essential for cranes, excavators, and wind turbines.
                </p>
                <Link to="/finder" className="cnz-cat-link">
                  Search Inventory <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cnz-cta">
        <div className="container cnz-cta-inner">
          <h2 className="cnz-cta-title">Need CNZ Products for Your Project?</h2>
          <p className="cnz-cta-desc">
            As a sister company and authorized distributor, Collective Trade Links can fulfill all your CNZ bearing requirements across India.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get a Customized Quote
          </Link>
        </div>
      </section>

    </div>
  );
};

export default CNZBearings;
