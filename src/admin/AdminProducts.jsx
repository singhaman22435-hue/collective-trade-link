import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../context/ProductContext';

const AdminProducts = () => {
  const { products, deleteProduct } = useProducts();
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your product catalogue ({products.length} products)</p>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="admin-card">
        {products.length === 0 ? (
          <div className="empty-state" style={{ padding: '5rem 2rem' }}>
            <h3>No products yet</h3>
            <p>Add your first product to get started.</p>
            <Link to="/admin/products/add" className="btn btn-primary mt-4">Add Product</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Brands</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} style={{ width: 56, height: 44, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      <br />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{product.shortDesc?.slice(0, 60)}...</span>
                    </td>
                    <td><span className="badge badge-primary">{product.category}</span></td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{product.brands || '—'}</td>
                    <td>
                      {product.featured
                        ? <span className="badge badge-success">Yes</span>
                        : <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No</span>
                      }
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/admin/products/edit/${product.id}`} className="btn-icon btn-icon-edit" title="Edit">
                          <Edit2 size={16} />
                        </Link>
                        <button className="btn-icon btn-icon-delete" title="Delete" onClick={() => confirmDelete(product.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
