import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import BearingFilterSidebar from '../components/BearingFilterSidebar';
import './BearingFinder.css';

const BearingFinder = () => {
  const { products } = useProducts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    sizes: []
  });

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.brands.length > 0) {
        const productBrands = product.brands.split(',').map(b => b.trim());
        const hasBrand = filters.brands.some(b => productBrands.includes(b));
        if (!hasBrand) return false;
      }
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category) && !filters.categories.some(c => product.specs.join(' ').includes(c))) {
            return false;
        }
      }
      return true;
    });
  }, [products, searchQuery, filters]);

  return (
    <div className="finder-page">
      {/* Header section */}
      <div className="finder-hero">
        <div className="container">
          <h1 className="finder-hero-title">Bearing Finder</h1>
          <p className="finder-hero-desc">
            Advanced search and filtering to find the exact industrial components you need.
          </p>
        </div>
      </div>

      <div className="container finder-layout">
        {/* Sidebar Filter */}
        <BearingFilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />

        {/* Main Content */}
        <div className="finder-main">
          {/* Search Bar & Mobile Filter Toggle */}
          <div className="finder-search-bar">
            <button 
              className="finder-mobile-toggle"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Filter size={20} />
              Filters
            </button>
            <div className="finder-search-input-wrap">
              <Search className="finder-search-icon" size={20} />
              <input 
                type="text"
                placeholder="Search by Designation or Product Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="finder-search-input"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="finder-results-info">
            <p>Showing <strong>{filteredProducts.length}</strong> results</p>
          </div>

          {/* Results Grid */}
          <div className="grid-3">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={product.id}
                className="finder-card"
              >
                {/* Image Placeholder */}
                <div className="finder-card-img-wrap">
                  {product.image ? (
                     <img src={product.image} alt={product.name} className="finder-card-img" />
                  ) : (
                    <div className="finder-card-placeholder"></div>
                  )}
                  {/* Brand Badges overlay */}
                  <div className="finder-card-badges">
                    {product.brands.split(',').slice(0, 2).map(brand => (
                      <span key={brand} className="badge finder-card-badge">
                        {brand.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="finder-card-body">
                  <span className="finder-card-cat">{product.category}</span>
                  <h3 className="finder-card-title">{product.name}</h3>
                  <p className="finder-card-desc">{product.shortDesc}</p>
                  
                  <div className="finder-card-footer">
                    <a href={`/products/${product.id}`} className="finder-card-link">
                      View Details
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="finder-empty">
              <div className="finder-empty-icon">
                <Search size={32} />
              </div>
              <h3 className="finder-empty-title">No bearings found</h3>
              <p className="finder-empty-desc">Try adjusting your filters or search query.</p>
              <button 
                className="btn btn-outline"
                onClick={() => {setFilters({brands:[], categories:[], sizes:[]}); setSearchQuery('');}}
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BearingFinder;
