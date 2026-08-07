import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useInquiries } from '../context/InquiryContext';

const AdminInquiries = () => {
  const { inquiries, markAsRead, deleteInquiry } = useInquiries();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = inquiries.filter((inq) => {
    const matchSearch = inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.subject || '').toLowerCase().includes(search.toLowerCase());
    if (filter === 'unread') return matchSearch && !inq.read;
    if (filter === 'read') return matchSearch && inq.read;
    return matchSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry?')) deleteInquiry(id);
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1>Inquiries</h1>
          <p>Manage all customer inquiries received from the Contact form.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '0 0 280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', background: 'var(--color-bg-alt)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: filter === f ? 'var(--color-primary)' : 'transparent',
                color: filter === f ? 'white' : 'var(--color-text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: '5rem 2rem' }}>
            <h3>No inquiries found</h3>
            <p>Inquiries submitted through the contact form will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Name / Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => (
                  <tr key={inq.id} style={{ fontWeight: inq.read ? 'normal' : '600' }}>
                    <td>
                      <span className={`badge ${inq.read ? 'badge-success' : 'badge-warning'}`}>
                        {inq.read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td>
                      <div>{inq.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>{inq.email}</div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>{inq.phone || '—'}</td>
                    <td style={{ fontSize: '0.875rem', fontWeight: 400 }}>{inq.subject || '—'}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', maxWidth: 200, fontWeight: 400 }}>
                      {inq.message?.slice(0, 80)}{inq.message?.length > 80 ? '...' : ''}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 400, whiteSpace: 'nowrap' }}>
                      {new Date(inq.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className={`btn-icon ${inq.read ? 'btn-icon-edit' : 'btn-icon-edit'}`}
                          title={inq.read ? 'Mark as Unread (toggle)' : 'Mark as Read'}
                          onClick={() => markAsRead(inq.id)}
                          style={{ opacity: inq.read ? 0.5 : 1 }}
                        >
                          {inq.read ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button className="btn-icon btn-icon-delete" title="Delete" onClick={() => handleDelete(inq.id)}>
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

export default AdminInquiries;
