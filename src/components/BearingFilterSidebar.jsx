import React from 'react';
import { Filter, X } from 'lucide-react';
// CSS is imported in BearingFinder.jsx

const BearingFilterSidebar = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleClear = () => {
    setFilters({ brands: [], categories: [], sizes: [] });
  };

  const BRANDS = ['SKF', 'FAG', 'NTN', 'KOYO', 'HIWIN', 'THK', 'EZO', 'CNZ'];
  const CATEGORIES = ['Deep Groove', 'Angular Contact', 'Linear Motion', 'Pillow Block', 'Needle Roller'];
  const SIZES = ['Small (< 50mm)', 'Medium (50-150mm)', 'Large (> 150mm)'];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="finder-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`finder-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="finder-sidebar-header">
          <div className="finder-sidebar-title">
            <Filter size={20} />
            <span>Filters</span>
          </div>
          <button 
            className="finder-clear-btn"
            onClick={handleClear}
          >
            Clear All
          </button>
          <button 
            className="finder-close-btn"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Brands Section */}
        <div className="finder-filter-group">
          <h3 className="finder-filter-title">Brands</h3>
          <div className="finder-filter-list">
            {BRANDS.map(brand => (
              <label key={brand} className="finder-checkbox-label">
                <input 
                  type="checkbox" 
                  className="finder-checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="finder-filter-group">
          <h3 className="finder-filter-title">Categories</h3>
          <div className="finder-filter-list">
            {CATEGORIES.map(cat => (
              <label key={cat} className="finder-checkbox-label">
                <input 
                  type="checkbox" 
                  className="finder-checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleFilterChange('categories', cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="finder-filter-group">
          <h3 className="finder-filter-title">Inner Diameter</h3>
          <div className="finder-filter-list">
            {SIZES.map(size => (
              <label key={size} className="finder-checkbox-label">
                <input 
                  type="checkbox" 
                  className="finder-checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => handleFilterChange('sizes', size)}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

      </aside>
    </>
  );
};

export default BearingFilterSidebar;
