import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, MapPin } from 'lucide-react';
import { useInquiries } from '../context/InquiryContext';
import TiltCard from '../components/TiltCard';
import './Contact.css';

const Contact = () => {
  const { addInquiry } = useInquiries();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addInquiry(form);
      setSubmitted(true);
      setLoading(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Reach Out</motion.span>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Get in touch today. We look forward to powering your industry.</motion.p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Info Panel */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="contact-info">
              <span className="section-label">Contact Information</span>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem' }}>Let's Build Something <span className="gradient-text">Together</span></h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                At Collective Trade Links, we value your partnership. Our dedicated team is ready to assist you in finding the perfect industrial motion components.
              </p>

              <div className="contact-info-cards">
                <TiltCard>
                  <div className="contact-info-card glass-card">
                    <div className="contact-info-icon"><Phone size={22} /></div>
                    <div>
                      <h4>Call Us</h4>
                      <p><strong>Monil Mehta</strong></p>
                      <p>+91 9653343336</p>
                      <p>+91 9594000246</p>
                      <br />
                      <p><strong>Nitin Mehta</strong></p>
                      <p>+91 9323132460</p>
                      <p>+91 8591173422</p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="contact-info-card glass-card">
                    <div className="contact-info-icon"><Mail size={22} /></div>
                    <div>
                      <h4>Email Us</h4>
                      <a href="mailto:collectivetradelinks@gmail.com">collectivetradelinks@gmail.com</a>
                      <br />
                      <a href="mailto:monilmehta32@gmail.com">monilmehta32@gmail.com</a>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="contact-info-card glass-card">
                    <div className="contact-info-icon"><MapPin size={22} /></div>
                    <div>
                      <h4>Head Office</h4>
                      <p>Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>

            {/* Form Panel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="contact-form-wrap glass-card">
              {submitted ? (
                <div className="form-success">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="success-icon">
                    <CheckCircle size={48} />
                  </motion.div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 className="form-heading">Send us a Message</h3>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input id="contact-name" type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-email">Email Address *</label>
                        <input id="contact-email" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="contact-phone">Phone Number</label>
                        <input id="contact-phone" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact-subject">Subject *</label>
                        <input id="contact-subject" type="text" name="subject" placeholder="Product inquiry, quote, etc." value={form.subject} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-message">Message *</label>
                      <textarea id="contact-message" name="message" rows="5" placeholder="Tell us how we can help you..." value={form.message} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} style={{ position: 'relative', overflow: 'hidden' }}>
                      <motion.div whileTap={{ scale: 0.95 }} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        {loading ? 'Sending...' : (<>Send Message <Send size={18} /></>)}
                      </motion.div>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
          
          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginTop: '4rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Collective Trade Links Location"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
