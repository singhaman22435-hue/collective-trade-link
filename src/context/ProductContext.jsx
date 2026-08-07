import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext(null);

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Ball Bearings',
    category: 'Bearings',
    shortDesc: 'High-performance ball bearings for diverse industrial applications.',
    fullDesc: 'We offer a wide variety of high-performance ball bearings for various applications. Our range includes deep groove ball bearings, angular contact ball bearings, and self-aligning ball bearings, sourced from trusted brands like NTN, KOYO, and FAG for maximum reliability and longevity.',
    specs: ['Deep Groove Ball Bearings', 'Angular Contact Ball Bearings', 'Self-aligning Ball Bearings', 'Thrust Ball Bearings', 'Available in multiple bore sizes'],
    image: '/images/bearings.png',
    brands: 'NTN, KOYO, FAG, SKF',
    featured: true,
  },
  {
    id: '2',
    name: 'Linear Motion Systems',
    category: 'Linear Motion',
    shortDesc: 'Precise linear guideways and shafts for smooth, accurate movement.',
    fullDesc: 'Durable shafts, LM series, and rod end bearings, including specialized CNZ guideways, for precise linear movement. Ideal for CNC machinery, automation systems, and robotic applications requiring exact positioning and low friction movement.',
    specs: ['LM Linear Guides', 'Ball Screw Shafts', 'Rod End Bearings', 'CNZ Guideways', 'Linear Bushings'],
    image: '/images/linear.png',
    brands: 'HIWIN, THK, CNZ',
    featured: true,
  },
  {
    id: '3',
    name: 'Pillow & Plummer Blocks',
    category: 'Mounted Bearings',
    shortDesc: 'Reliable housing units for robust bearing support across industries.',
    fullDesc: 'Our pillow and plummer blocks ensure reliable support and smooth operation across industries. These mounted bearing units are designed for easy installation and maintenance, providing secure housing for bearings in challenging industrial environments.',
    specs: ['Pillow Block Units (UCF, UCP)', 'Plummer Block Housing', 'Take-Up Bearing Units', 'Flange Bearing Units', 'Various shaft size compatibility'],
    image: '/images/bearings.png',
    brands: 'NTN, KOYO, FAG',
    featured: false,
  },
  {
    id: '4',
    name: 'Specialized Needle Bearings',
    category: 'Specialty Bearings',
    shortDesc: 'Innovative needle bearing designs for compact, high-load applications.',
    fullDesc: 'Innovative designs like PAP, Linear, Composite, and Self-Lubricating Bushings for evolving industrial needs. Needle bearings are ideal for applications where radial space is limited but high load capacity is required.',
    specs: ['PAP Needle Bearings', 'Linear Needle Bearings', 'Composite Bushings', 'Self-Lubricating Bushings', 'Drawn Cup Needle Bearings'],
    image: '/images/bearings.png',
    brands: 'IKO, THK',
    featured: false,
  },
  {
    id: '5',
    name: 'Industrial-Grade Lubricants',
    category: 'Lubricants',
    shortDesc: 'Premium KUBLER greases and SKF high-performance lubricants.',
    fullDesc: 'Premium KUBLER greases and high-performance SKF lubricants for extending bearing and machinery life. Our range of industrial lubricants protects against wear, corrosion, and extreme temperatures, ensuring optimal machine performance and reduced maintenance intervals.',
    specs: ['KUBLER Specialty Greases', 'SKF High-Performance Lubricants', 'High-Temperature Greases', 'Food-Grade Lubricants', 'Anti-Corrosion Oils'],
    image: '/images/lubricant.png',
    brands: 'SKF, KUBLER',
    featured: true,
  },
  {
    id: '6',
    name: 'Advanced Specialty Bearings',
    category: 'Specialty Bearings',
    shortDesc: 'Miniature, stainless steel, and thermoplastic bearings for unique demands.',
    fullDesc: 'Discover our diverse range of premium bearings including miniature, stainless steel, thermoplastic, and high-strength options. Designed for specialized applications in food processing, medical, and precision instrumentation industries.',
    specs: ['Miniature Bearings', 'Stainless Steel Bearings', 'Thermoplastic Bearings', 'High-Strength Ceramic Bearings', 'EZO Precision Ball Bearings'],
    image: '/images/bearings.png',
    brands: 'EZO, SKF',
    featured: false,
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('ctl_products');
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('ctl_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id) => products.find((p) => p.id === id);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
