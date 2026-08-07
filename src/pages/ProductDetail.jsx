import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Tag, Send } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="not-found-page">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>This product may have been removed.</p>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main Detail */}
      <section className="section" style={{ background: 'var(--color-bg)', paddingTop: '3rem' }}>
        <div className="container product-detail-grid">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="detail-img-wrap"
          >
            <img src={product.image} alt={product.name} className="detail-img" />
            <div className="detail-img-badges">
              <span className="badge badge-primary">{product.category}</span>
              {product.featured && <span className="badge badge-success">Featured</span>}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="detail-info"
          >
            <div className="detail-header">
              <span className="section-label">{product.category}</span>
              <h1 className="detail-title">{product.name}</h1>
            </div>

            <p className="detail-full-desc">{product.fullDesc}</p>

            {product.brands && (
              <div className="detail-brands">
                <Tag size={16} />
                <span><strong>Available Brands:</strong> {product.brands}</span>
              </div>
            )}

            {product.specs && product.specs.length > 0 && (
              <div className="detail-specs">
                <h3>Product Specifications</h3>
                <ul className="specs-list">
                  {product.specs.map((spec, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Quote <Send size={18} />
              </Link>
              <button onClick={() => navigate(-1)} className="btn btn-outline btn-lg">
                <ChevronLeft size={18} /> Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">More Products</span>
              <h2 className="section-title">Related <span className="gradient-text">Products</span></h2>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card related-card"
                >
                  <img src={p.image} alt={p.name} className="related-card-img" />
                  <div className="related-card-body">
                    <span className="badge badge-primary">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.shortDesc}</p>
                    <Link to={`/products/${p.id}`} className="product-preview-link">
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
