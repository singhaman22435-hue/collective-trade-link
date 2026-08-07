import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Plus, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../context/ProductContext';
import './AdminForm.css';

const CATEGORIES = ['Bearings', 'Linear Motion', 'Mounted Bearings', 'Specialty Bearings', 'Lubricants', 'Other'];

const PRESET_IMAGES = [
  { label: 'Bearings (preset)', value: '/images/bearings.png' },
  { label: 'Linear Motion (preset)', value: '/images/linear.png' },
  { label: 'Lubricant (preset)', value: '/images/lubricant.png' },
  { label: 'General / Hero (preset)', value: '/images/hero.png' },
];

const emptyForm = {
  name: '',
  category: 'Bearings',
  shortDesc: '',
  fullDesc: '',
  brands: '',
  image: '/images/bearings.png',
  featured: false,
  specs: [''],
};

const AdminAddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, getProductById } = useProducts();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  /* ── image upload state ── */
  const [imageMode, setImageMode] = useState('preset'); // 'preset' | 'upload'
  const [uploadedImage, setUploadedImage] = useState(null); // base64 string
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      const product = getProductById(id);
      if (product) {
        const isBase64 = product.image && product.image.startsWith('data:');
        setForm({ ...product, specs: product.specs?.length ? product.specs : [''] });
        if (isBase64) {
          setImageMode('upload');
          setUploadedImage(product.image);
        } else {
          setImageMode('preset');
        }
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSpecChange = (i, val) => {
    const specs = [...form.specs];
    specs[i] = val;
    setForm({ ...form, specs });
  };
  const addSpec = () => setForm({ ...form, specs: [...form.specs, ''] });
  const removeSpec = (i) => setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) });

  /* ── Image Upload Handlers ── */
  const processFile = (file) => {
    setUploadError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload a valid image file (JPG, PNG, WEBP, GIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setUploadedImage(base64);
      setForm((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setForm((prev) => ({ ...prev, image: '/images/bearings.png' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const switchToPreset = () => {
    setImageMode('preset');
    setUploadedImage(null);
    setForm((prev) => ({ ...prev, image: '/images/bearings.png' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const switchToUpload = () => {
    setImageMode('upload');
    // If no uploaded image yet, clear preset
    if (!uploadedImage) {
      setForm((prev) => ({ ...prev, image: '' }));
    }
  };

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      setUploadError('Please select or upload a product image.');
      return;
    }
    setSaving(true);
    const cleanedForm = { ...form, specs: form.specs.filter((s) => s.trim()) };
    setTimeout(() => {
      if (isEdit) {
        updateProduct(id, cleanedForm);
      } else {
        addProduct(cleanedForm);
      }
      navigate('/admin/products');
    }, 500);
  };

  /* ── Current preview image ── */
  const previewSrc = imageMode === 'upload' ? uploadedImage : form.image;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p>{isEdit ? 'Update the product details below.' : 'Fill in the details to add a new product to the catalogue.'}</p>
        </div>
      </div>

      <form className="admin-form-grid" onSubmit={handleSubmit}>
        {/* ── Main Info ── */}
        <div className="admin-form-main admin-card" style={{ padding: '2rem' }}>
          <h3 className="form-section-title">Product Information</h3>

          <div className="form-group">
            <label>Product Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Premium Ball Bearings" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Brands</label>
              <input type="text" name="brands" value={form.brands} onChange={handleChange} placeholder="e.g. NTN, KOYO, FAG" />
            </div>
          </div>

          <div className="form-group">
            <label>Short Description *</label>
            <input type="text" name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="Brief description (shown in product cards)" required />
          </div>

          <div className="form-group">
            <label>Full Description *</label>
            <textarea name="fullDesc" rows="5" value={form.fullDesc} onChange={handleChange} placeholder="Detailed product description (shown on product detail page)" required />
          </div>

          <div className="form-group">
            <div className="specs-header">
              <label>Specifications</label>
              <button type="button" className="btn btn-outline btn-sm" onClick={addSpec}>
                <Plus size={14} /> Add Spec
              </button>
            </div>
            <div className="specs-list-inputs">
              {form.specs.map((spec, i) => (
                <div key={i} className="spec-input-row">
                  <input type="text" value={spec} onChange={(e) => handleSpecChange(i, e.target.value)} placeholder={`Specification ${i + 1}`} />
                  {form.specs.length > 1 && (
                    <button type="button" className="btn-icon btn-icon-delete" onClick={() => removeSpec(i)}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="admin-form-sidebar">

          {/* Image Card */}
          <div className="admin-card" style={{ padding: '2rem' }}>
            <h3 className="form-section-title">Product Image</h3>

            {/* Mode Tabs */}
            <div className="image-mode-tabs">
              <button
                type="button"
                className={`image-mode-tab ${imageMode === 'upload' ? 'active' : ''}`}
                onClick={switchToUpload}
              >
                <Upload size={16} /> Upload File
              </button>
              <button
                type="button"
                className={`image-mode-tab ${imageMode === 'preset' ? 'active' : ''}`}
                onClick={switchToPreset}
              >
                <ImageIcon size={16} /> Use Preset
              </button>
            </div>

            {/* Upload Mode */}
            {imageMode === 'upload' && (
              <div className="upload-zone-wrap">
                {uploadedImage ? (
                  <div className="upload-preview">
                    <img src={uploadedImage} alt="Uploaded product preview" className="upload-preview-img" />
                    <div className="upload-preview-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload size={14} /> Change Image
                      </button>
                      <button
                        type="button"
                        className="btn-icon btn-icon-delete"
                        onClick={clearUploadedImage}
                        title="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="dropzone-icon">
                      <Upload size={32} />
                    </div>
                    <p className="dropzone-title">Drag & drop image here</p>
                    <p className="dropzone-sub">or click to browse</p>
                    <p className="dropzone-hint">JPG, PNG, WEBP, GIF — max 5MB</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />

                {uploadError && (
                  <div className="upload-error">
                    <X size={14} /> {uploadError}
                  </div>
                )}
              </div>
            )}

            {/* Preset Mode */}
            {imageMode === 'preset' && (
              <div className="form-group">
                {previewSrc && (
                  <div className="image-preview">
                    <img src={previewSrc} alt="Product preview" />
                  </div>
                )}
                <label>Select Preset Image</label>
                <select name="image" value={form.image} onChange={handleChange}>
                  {PRESET_IMAGES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Visibility Card */}
          <div className="admin-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <h3 className="form-section-title">Visibility</h3>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                <span>Mark as Featured Product</span>
              </label>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Featured products appear on the home page.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary w-full" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product')}
            </button>
            <button type="button" className="btn btn-outline w-full" onClick={() => navigate('/admin/products')}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminAddProduct;
