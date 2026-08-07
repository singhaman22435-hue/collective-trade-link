import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>{children}</motion.div>;
};

const BRANDS = [
  { name: 'NTN', role: 'Direct Importers', desc: 'World-leading precision bearing manufacturer from Japan.' },
  { name: 'KOYO', role: 'Authorized Distributors', desc: 'Japanese engineering excellence in bearing solutions.' },
  { name: 'FAG', role: 'Distribution Partners', desc: 'German precision for industrial bearing applications.' },
  { name: 'SKF', role: 'Premium Lubricants', desc: 'Swedish brand trusted globally for performance lubricants.' },
  { name: 'HIWIN', role: 'Motion Solutions', desc: 'Taiwan\'s benchmark in linear motion technology.' },
  { name: 'THK', role: 'Linear Motion', desc: 'Japanese pioneers of linear motion guideways.' },
  { name: 'IKO', role: 'Needle Bearings', desc: 'Compact high-precision bearing specialists.' },
  { name: 'EZO', role: 'Precision Balls', desc: 'Compact precision ball bearings, Japan.' },
  { name: 'CNZ', role: 'Authorized Distributors', desc: 'Precision bearing technology for specialized use.' },
];

const INDUSTRIES = [
  { title: 'Crane Manufacturing', desc: 'Components for heavy lifting and precision movement.', img: '/images/crane.png' },
  { title: 'Multi-Car Parking Systems', desc: 'Robust products designed for extreme conditions.', img: '/images/linear.png' },
  { title: 'Food Processing Machines', desc: 'Specialized parts for efficient food processing.', img: '/images/bearings.png' },
  { title: 'Pumps & Fluid Systems', desc: 'Reliable parts for continuous operation in demanding environments.', img: '/images/lubricant.png' },
  { title: 'Special Purpose Machinery', desc: 'Custom solutions for unique machine requirements.', img: '/images/bearings.png' },
  { title: 'Fans & Blowers', desc: 'Performance-driven components for ventilation.', img: '/images/linear.png' },
];

const USP = [
  'Service Excellence Guaranteed',
  'Competitive & Transparent Pricing',
  'Genuine Products — Thoroughly Inspected',
  'Technical Support for Bearing Selection',
  'On-time Delivery Commitment',
  'Dedicated Account Management',
];

const About = () => (
  <div className="about-page">
    {/* Page Hero */}
    <section className="page-hero">
      <div className="container">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Our Story</motion.span>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>About Us</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Connecting Industries, Delivering Excellence — Since Decades.</motion.p>
      </div>
    </section>

    {/* WHO ARE WE */}
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container about-intro-grid">
        <AnimatedSection className="about-intro-text">
          <motion.span variants={fadeUp} className="section-label">Who Are We</motion.span>
          <motion.h2 variants={fadeUp} className="section-title">A Trusted Name in<br /><span className="gradient-text">Industrial Components</span></motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Collective Trade Links stands as a beacon of reliability and expertise in the distribution and import of high-quality industrial products. With years of experience and a steadfast customer-first approach, we've built a reputation founded on trust and unwavering commitment to client success.
          </motion.p>
          <motion.div variants={fadeUp} className="pillars-row">
            {[{ Icon: Award, t: 'Trust & Experience', d: 'Decades of industry presence' }, { Icon: Users, t: 'Customer-First', d: 'Dedicated to your success' }, { Icon: TrendingUp, t: 'Industry Leadership', d: 'Pioneering distribution' }].map(({ Icon, t, d }) => (
              <div key={t} className="pillar-chip">
                <Icon size={22} className="pillar-icon" />
                <div><strong>{t}</strong><p>{d}</p></div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn-primary">Get in Touch <ArrowRight size={18} /></Link>
          </motion.div>
        </AnimatedSection>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="about-intro-img-wrap">
          <img src="/images/hero.png" alt="About Collective Trade Links" className="about-intro-img" />
          <div className="about-intro-img-badge glass-card">
            <strong>100%</strong>
            <span>Authentic Products</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* USP */}
    <section className="section" style={{ background: 'var(--gradient-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="usp-bg-shape" />
      <div className="container">
        <AnimatedSection className="section-header">
          <motion.span variants={fadeUp} className="section-label" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Our Strengths</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ color: 'white' }}>Our Unique Selling <span style={{ opacity: 0.9 }}>Proposition</span></motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ color: 'rgba(255,255,255,0.75)' }}>Key strengths that make us the preferred partner for industrial components.</motion.p>
        </AnimatedSection>
        <AnimatedSection className="usp-grid">
          {USP.map((item, i) => (
            <motion.div key={item} custom={i} variants={fadeUp} className="usp-item">
              <CheckCircle size={20} />
              <span>{item}</span>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>

    {/* BRANDS */}
    <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <AnimatedSection className="section-header">
          <motion.span variants={fadeUp} className="section-label">Our Partners</motion.span>
          <motion.h2 variants={fadeUp} className="section-title">Trusted <span className="gradient-text">Brand Partners</span></motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle">We are authorized distributors and direct importers of these world-class brands.</motion.p>
        </AnimatedSection>
        <AnimatedSection className="brands-detail-grid">
          {BRANDS.map((brand, i) => (
            <motion.div key={brand.name} custom={i} variants={fadeUp} className="brand-detail-card glass-card">
              <div className="brand-detail-name">{brand.name}</div>
              <span className="badge badge-primary">{brand.role}</span>
              <p className="brand-detail-desc">{brand.desc}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>

    {/* INDUSTRIES */}
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <AnimatedSection className="section-header">
          <motion.span variants={fadeUp} className="section-label">Industries Served</motion.span>
          <motion.h2 variants={fadeUp} className="section-title">Major Industries <span className="gradient-text">We Serve</span></motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle">Diverse Applications Across Multiple Sectors</motion.p>
        </AnimatedSection>
        <AnimatedSection className="grid-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.title} custom={i} variants={fadeUp} className="industry-card card">
              <div className="industry-img-wrap">
                <img src={ind.img} alt={ind.title} className="industry-img" />
              </div>
              <div className="industry-body">
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default About;
