import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Tag, Send, Info, Settings, Factory } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const product = getProductById(id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>This product may have been removed or does not exist.</p>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container pd-breadcrumb-inner">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} />
          <span className="pd-crumb-current">{product.name}</span>
        </div>
      </div>

      {/* Main Detail Header Section */}
      <section className="pd-main-section">
        <div className="container pd-main-grid">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pd-image-wrap"
          >
            {product.image && (
              <img src={product.image} alt={product.name} />
            )}
            <div className="pd-image-badges">
              <span className="badge badge-primary">{product.category}</span>
              {product.featured && <span className="badge badge-success">Featured</span>}
            </div>
          </motion.div>

          {/* Core Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pd-info"
          >
            <span className="pd-info-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="pd-info-desc">{product.shortDesc}</p>

            {product.brands && (
              <div className="pd-brands-bar">
                <Tag size={20} />
                <span className="pd-brands-label">Available Brands:</span>
                <span className="pd-brands-value">{product.brands}</span>
              </div>
            )}

            <div className="pd-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request Quote <Send size={18} />
              </Link>
              <button onClick={() => navigate(-1)} className="btn btn-outline btn-lg">
                <ChevronLeft size={18} /> Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="pd-tabs-section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="pd-tabs-nav">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pd-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <Info size={20} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`pd-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            >
              <Settings size={20} /> Specifications
            </button>
            <button 
              onClick={() => setActiveTab('industries')}
              className={`pd-tab-btn ${activeTab === 'industries' ? 'active' : ''}`}
            >
              <Factory size={20} /> Applications
            </button>
          </div>

          {/* Tab Content */}
          <div className="pd-tab-content-box">
            <AnimatePresence mode="wait">
              
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="pd-tab-title">Product Overview</h3>
                  <p className="pd-tab-text">{product.fullDesc}</p>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <h3 className="pd-tab-title">Technical Specifications</h3>
                   {product.specs && product.specs.length > 0 ? (
                     <div className="pd-specs-grid">
                       {product.specs.map((spec, i) => (
                         <div key={i} className="pd-spec-item">
                           <CheckCircle size={20} />
                           <span className="pd-spec-text">{spec}</span>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-muted" style={{ fontStyle: 'italic' }}>No detailed specifications available for this product.</p>
                   )}
                </motion.div>
              )}

              {activeTab === 'industries' && (
                <motion.div key="industries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <h3 className="pd-tab-title">Industry Applications</h3>
                   <p className="pd-tab-text" style={{ marginBottom: '1.5rem' }}>Our {product.name.toLowerCase()} are engineered to perform in demanding environments across various sectors:</p>
                   <div className="pd-ind-grid">
                     {['Automotive', 'Aerospace', 'Robotics', 'Heavy Machinery', 'Food Processing', 'Medical', 'Mining', 'Wind Energy'].map(ind => (
                       <div key={ind} className="pd-ind-card">
                         <span className="pd-ind-text">{ind}</span>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pd-related-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">More Products</span>
              <h2 className="section-title">Related <span className="gradient-text">Components</span></h2>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card pd-related-card"
                >
                  <div className="pd-related-img-wrap">
                    {p.image && <img src={p.image} alt={p.name} />}
                  </div>
                  <div className="pd-related-body">
                    <span className="pd-related-cat">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.shortDesc}</p>
                    <Link to={`/products/${p.id}`} className="pd-related-link">
                      View Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
