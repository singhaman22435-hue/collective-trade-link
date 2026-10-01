import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Shield, Zap, Tag, Briefcase, ArrowRight, CheckCircle,
  Phone, Mail, Star, Clock, MapPin, Award, Users, TrendingUp,
  Package, Wrench, Droplets, ChevronDown, ChevronUp, Truck, Globe, Layers, ArrowDown
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import AnimatedCounter from '../components/AnimatedCounter';
import TiltCard from '../components/TiltCard';
import './Home.css';

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
};
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>{children}</motion.div>;
};

/* ─── 3D Floating Particle Field ─── */
const ParticleField = () => {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  ).current;

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ─── 3D Floating Badge ─── */
const Float3DBadge = ({ children, className = '', delay = 0, offsetY = 0, duration = 5 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30, rotateX: 15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ perspective: 800, transformStyle: 'preserve-3d' }}
  >
    <motion.div
      animate={{
        y: [offsetY, offsetY - 12, offsetY],
        rotateZ: [-1, 1, -1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </motion.div>
);

/* ─── Typewriter Effect ─── */
const Typewriter = ({ words, className = '' }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className={className} style={{ display: 'inline-block', minWidth: '280px' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: -45 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─── 3D Mouse-tracking Hero Image ─── */
const Hero3DImage = ({ scrollY }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 30 });
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="hero-image-side"
      initial={{ opacity: 0, x: 80, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ y: y2, perspective: 1200 }}
    >
      <motion.div
        className="hero-img-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Glow ring behind image */}
        <div className="hero-img-glow" />
        <img src="/images/hero.png" alt="Premium industrial bearings from Collective Trade Links" className="hero-img" />

        {/* 3D floating badges */}
        <Float3DBadge className="hero-img-badge" delay={0.6} offsetY={0} duration={5}>
          <strong><AnimatedCounter value="9" />+</strong>
          <span>Global Brands</span>
        </Float3DBadge>

        <Float3DBadge className="hero-img-badge-2 glass-card" delay={0.8} offsetY={0} duration={6}>
          <CheckCircle size={18} style={{ color: '#16a34a' }} />
          <span><AnimatedCounter value="100%" /> Authentic</span>
        </Float3DBadge>

        <Float3DBadge className="hero-img-badge-3 glass-card" delay={1} offsetY={0} duration={7}>
          <Award size={18} style={{ color: 'var(--color-primary)' }} />
          <span>Since 2010</span>
        </Float3DBadge>
      </motion.div>
    </motion.div>
  );
};

/* ─── data ─── */
const STATS = [
  { value: '500+', label: 'Products Supplied', icon: <Package size={22} /> },
  { value: '10+', label: 'Years Experience', icon: <Clock size={22} /> },
  { value: '9', label: 'Trusted Brands', icon: <Award size={22} /> },
  { value: '100%', label: 'Authentic Products', icon: <Shield size={22} /> },
];

const WHY_US = [
  { icon: <Zap size={28} />, title: 'Responsive Service', desc: 'Our dedicated team ensures top-notch service at every step, with unmatched responsiveness to your needs.' },
  { icon: <Tag size={28} />, title: 'Competitive Pricing', desc: 'Affordable solutions without compromising on quality — ensuring the best market value for your components.' },
  { icon: <Shield size={28} />, title: 'Authenticity Guarantee', desc: 'Every product comes with a promise of authenticity, backed by thorough inspection and quality control.' },
  { icon: <Briefcase size={28} />, title: 'Industry Expertise', desc: 'Decades of experience means we understand the unique demands of diverse industrial sectors.' },
];

const PROCESS = [
  { step: '01', icon: <Phone size={24} />, title: 'Contact Us', desc: 'Reach out via phone, email, or our contact form. Our team responds within the same business day.' },
  { step: '02', icon: <Package size={24} />, title: 'Requirement Analysis', desc: 'We analyse your specific bearing and motion component requirements with precision.' },
  { step: '03', icon: <CheckCircle size={24} />, title: 'Product Selection', desc: 'We recommend the best-fit products from our premium catalogue of 9 global brands.' },
  { step: '04', icon: <Truck size={24} />, title: 'Delivery', desc: 'Authentic, inspected products delivered promptly to your location across India.' },
];

const INDUSTRIES = [
  { icon: <Layers size={32} />, name: 'Crane Manufacturing', desc: 'Components for heavy lifting & precision movement' },
  { icon: <TrendingUp size={32} />, name: 'Multi-Car Parking Systems', desc: 'Robust products for extreme load conditions' },
  { icon: <Package size={32} />, name: 'Food Processing Machines', desc: 'Food-grade & hygienic motion components' },
  { icon: <Droplets size={32} />, name: 'Pumps & Fluid Systems', desc: 'Reliable parts for continuous operation' },
  { icon: <Wrench size={32} />, name: 'Special Purpose Machinery', desc: 'Custom SPM solutions for unique requirements' },
  { icon: <Globe size={32} />, name: 'Fans & Blowers Mfg.', desc: 'High-performance components for ventilation' },
];

const BRANDS = ['NTN', 'KOYO', 'FAG', 'SKF', 'HIWIN', 'THK', 'IKO', 'EZO', 'CNZ'];

const FAQS = [
  {
    q: 'What brands does Collective Trade Links distribute?',
    a: 'We are authorized distributors for NTN, KOYO, and CNZ, and importers of FAG, SKF, HIWIN, THK, IKO, and EZO — 9 world-class brands covering all industrial motion needs.'
  },
  {
    q: 'What types of bearings do you supply?',
    a: 'We supply premium ball bearings, needle bearings, pillow & plummer block bearings, linear motion systems, specialty bearings (miniature, stainless steel, thermoplastic), and industrial lubricants from KUBLER and SKF.'
  },
  {
    q: 'How do I get a quote or place an order?',
    a: 'Simply contact us via phone at +91 9653343336 or email at collectivetradelinks@gmail.com. You can also fill out our online inquiry form and we\'ll get back to you same day.'
  },
  {
    q: 'Which industries do you serve across India?',
    a: 'We serve crane manufacturers, food processing plants, multi-car parking systems, pump & fluid system companies, special purpose machinery (SPM) manufacturers, and fans & blowers manufacturers.'
  },
  {
    q: 'Are your products genuine and authentic?',
    a: 'Absolutely. Every product undergoes thorough authenticity inspection and strict quality control before dispatch. We source directly from manufacturers, ensuring 100% genuine products.'
  },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    role: 'Procurement Manager, Heavy Industries',
    text: 'Collective Trade Links has been our go-to supplier for NTN bearings for over 5 years. Their quality is unmatched and delivery is always on time.',
    rating: 5,
  },
  {
    name: 'Priya Desai',
    role: 'Operations Head, Packaging Machinery',
    text: 'The team understands our technical requirements perfectly. They suggested the right SKF lubricant that reduced our maintenance cycle by 40%.',
    rating: 5,
  },
  {
    name: 'Arjun Nair',
    role: 'Chief Engineer, Crane Manufacturer',
    text: 'When it comes to HIWIN linear guides for our cranes, CTL is the only supplier we trust. Fast response, competitive pricing, and genuine products every time.',
    rating: 5,
  },
];

/* ─── FAQ Accordion ─── */
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className={`faq-item ${open ? 'faq-item--open' : ''}`}
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
    >
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span itemProp="name">{q}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={`faq-answer ${open ? 'faq-answer--open' : ''}`} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
        <p itemProp="text">{a}</p>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
   ══════════════════════════════════════════════════════════════ */
const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  // Parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 600], [1, 0.95]);

  return (
    <div className="home-page">

      {/* ═══════════════════════════════════════
          HERO — 3D Cinematic
      ═══════════════════════════════════════ */}
      <section className="hero" aria-label="Hero section">
        {/* Animated grid background */}
        <div className="hero-grid-bg" aria-hidden="true" />

        {/* Particle field */}
        <ParticleField />

        {/* Floating orbs */}
        <motion.div className="hero-bg-shapes" style={{ y: y1 }}>
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
        </motion.div>

        {/* Hero content with 3D perspective */}
        <motion.div
          className="container hero-content"
          style={{ opacity: opacityHero, scale: scaleHero }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge"
          >
            <span className="hero-badge-dot" />
            Empowering Industrial Solutions Since 2010
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-title-line">Connecting Industry,</span>
            <br />
            <span className="hero-title-line hero-title-line--gradient">
              <Typewriter
                words={['Delivering Excellence', 'Powering Growth', 'Ensuring Quality', 'Building Trust']}
                className="gradient-text"
              />
            </span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Trusted importers & authorized distributors of <strong>NTN, KOYO, SKF, FAG, HIWIN, THK</strong> and more.
            Premium bearings and industrial motion components — delivered across India.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/products" className="btn btn-primary btn-lg hero-btn-primary">
              Explore Products <ChevronRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Get a Free Quote</Link>
          </motion.div>

          <motion.div
            className="hero-checks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {['Authentic Products', 'Competitive Pricing', 'Expert Technical Support', 'Pan-India Delivery'].map((c, i) => (
              <motion.span
                key={c}
                className="hero-check"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <CheckCircle size={16} /> {c}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Hero Image */}
        <Hero3DImage scrollY={scrollY} />

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          TRUSTED BY RIBBON
      ═══════════════════════════════════════ */}
      <section className="trusted-ribbon" aria-label="Trusted by leading industries">
        <div className="container">
          <span className="trusted-label">Trusted by leading companies across India</span>
          <div className="trusted-logos">
            {['Crane Mfg.', 'Parking Systems', 'Food Processing', 'Pump Industries', 'SPM Manufacturers', 'Blower Mfg.'].map((name, i) => (
              <motion.div
                key={i}
                className="trusted-logo-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="stats-bar" aria-label="Company statistics">
        <div className="container">
          <AnimatedSection className="stats-grid">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={fadeScale} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <strong className="stat-value">
                   <AnimatedCounter value={stat.value} duration={2} />
                </strong>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT SNAPSHOT
      ═══════════════════════════════════════ */}
      <section className="section about-snapshot-section" aria-label="About us snapshot">
        <div className="container about-snapshot-grid">
          <motion.div
            className="about-snapshot-img-wrap"
            initial={{ opacity: 0, x: -50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <img src="/images/factory.png" alt="Collective Trade Links industrial facility" className="about-snapshot-img" />
            <Float3DBadge className="about-snapshot-card glass-card" delay={0} offsetY={0} duration={5}>
              <Award size={28} style={{ color: 'var(--color-primary)' }} />
              <div>
                <strong>Authorized Distributor</strong>
                <span>KOYO &amp; CNZ Bearings</span>
              </div>
            </Float3DBadge>
          </motion.div>

          <AnimatedSection className="about-snapshot-content">
            <motion.span variants={fadeUp} className="section-label">Who We Are</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" style={{ textAlign: 'left' }}>
              A Trusted Name in<br /><span className="gradient-text">Industrial Components</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="about-snapshot-desc">
              Collective Trade Links stands as a beacon of reliability and expertise in the distribution
              and import of high-quality industrial products. With years of experience and a steadfast
              customer-first approach, we've built a reputation founded on trust and unwavering commitment
              to client success.
            </motion.p>
            <motion.div variants={fadeUp} className="about-pillars">
              {[
                { Icon: Award, t: 'Trust & Experience', d: 'Decades of industry presence' },
                { Icon: Users, t: 'Customer-First', d: 'Dedicated to your success' },
                { Icon: TrendingUp, t: 'Industry Leadership', d: 'Pioneering distribution' },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="about-pillar">
                  <Icon size={20} className="pillar-icon-sm" />
                  <div><strong>{t}</strong><p>{d}</p></div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="btn btn-primary">Learn More About Us <ArrowRight size={18} /></Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }} aria-label="Why choose us">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Our Strengths</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">Why Choose <span className="gradient-text">Collective Trade Links?</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">We combine industry expertise with premium quality products and exceptional service delivery.</motion.p>
          </AnimatedSection>
          <AnimatedSection className="grid-2">
            {WHY_US.map((item, i) => (
              <motion.div key={item.title} custom={i} variants={fadeScale}>
                <TiltCard className="why-card glass-card">
                  <div className="why-icon">{item.icon}</div>
                  <div>
                    <h3 className="why-title">{item.title}</h3>
                    <p className="why-desc">{item.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW WE WORK — PROCESS
      ═══════════════════════════════════════ */}
      <section className="section process-section" aria-label="How we work">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Simple Process</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">How We <span className="gradient-text">Work</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">From your first inquiry to final delivery — a seamless, transparent process every time.</motion.p>
          </AnimatedSection>
          <AnimatedSection className="process-grid">
            {PROCESS.map((step, i) => (
              <motion.div key={step.step} custom={i} variants={fadeScale}>
                <TiltCard className="process-card glass-card">
                  <div className="process-step-num">{step.step}</div>
                  <div className="process-icon">{step.icon}</div>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.desc}</p>
                  {i < PROCESS.length - 1 && <div className="process-connector" />}
                </TiltCard>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }} aria-label="Featured products">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Product Highlights</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">Featured <span className="gradient-text">Products</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">Explore our most popular industrial motion components.</motion.p>
          </AnimatedSection>
          <AnimatedSection className="grid-3">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} custom={i} variants={fadeScale} className="product-preview-card card">
                <div className="product-preview-img-wrap">
                  <img src={product.image} alt={`${product.name} - Collective Trade Links`} className="product-preview-img" loading="lazy" />
                  <span className="product-preview-badge badge badge-primary">{product.category}</span>
                </div>
                <div className="product-preview-body">
                  <h3>{product.name}</h3>
                  <p>{product.shortDesc}</p>
                  <Link to={`/products/${product.id}`} className="product-preview-link">
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/products" className="btn btn-primary btn-lg">View All Products <ChevronRight size={20} /></Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INDUSTRIES WE SERVE
      ═══════════════════════════════════════ */}
      <section className="section industries-section" aria-label="Industries we serve">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Industries Served</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">Major Industries <span className="gradient-text">We Serve</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">Diverse applications across multiple industrial sectors — we have the right component for your industry.</motion.p>
          </AnimatedSection>
          <AnimatedSection className="industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={ind.name} custom={i} variants={fadeScale} className="industry-tile glass-card">
                <div className="industry-tile-icon">{ind.icon}</div>
                <h3 className="industry-tile-name">{ind.name}</h3>
                <p className="industry-tile-desc">{ind.desc}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRANDS MARQUEE
      ═══════════════════════════════════════ */}
      <section className="brands-section section" aria-label="Trusted brand partners">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Trusted Partners</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">Brands We <span className="gradient-text">Work With</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">Authorized distributors and direct importers of 9 world-class industrial brands.</motion.p>
          </AnimatedSection>
          <div className="brands-marquee-wrap">
            <div className="brands-marquee">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} className="brand-chip">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="section testimonials-section" aria-label="Client testimonials">
        <div className="container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">Client Voices</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">What Our <span className="gradient-text">Clients Say</span></motion.h2>
          </AnimatedSection>
          <AnimatedSection className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} custom={i} variants={fadeScale} className="testimonial-card glass-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ — AEO Section
      ═══════════════════════════════════════ */}
      <section
        className="section faq-section"
        aria-label="Frequently asked questions"
        itemScope itemType="https://schema.org/FAQPage"
      >
        <div className="container faq-container">
          <AnimatedSection className="section-header">
            <motion.span variants={fadeUp} className="section-label">FAQs</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">Frequently Asked <span className="gradient-text">Questions</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">Everything you need to know about our products and services.</motion.p>
          </AnimatedSection>
          <AnimatedSection className="faq-list">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUICK CONTACT STRIP
      ═══════════════════════════════════════ */}
      <section className="contact-strip" aria-label="Quick contact">
        <div className="container">
          <AnimatedSection className="contact-strip-inner">
            <motion.div variants={fadeUp} className="contact-strip-info">
              <MapPin size={20} />
              <span>Mumbai, Maharashtra, India</span>
            </motion.div>
            <motion.div variants={fadeUp} className="contact-strip-info">
              <Phone size={20} />
              <a href="tel:+919653343336">+91 9653343336 (Monil)</a>
            </motion.div>
            <motion.div variants={fadeUp} className="contact-strip-info">
              <Phone size={20} />
              <a href="tel:+919323132460">+91 9323132460 (Nitin)</a>
            </motion.div>
            <motion.div variants={fadeUp} className="contact-strip-info">
              <Mail size={20} />
              <a href="mailto:collectivetradelinks@gmail.com">collectivetradelinks@gmail.com</a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container">
          <AnimatedSection className="cta-inner">
            <motion.div variants={fadeUp} className="cta-text">
              <h2>Ready to Power Your Industry?</h2>
              <p>Get in touch with our experts today for the best industrial motion solutions across India.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="cta-actions">
              <Link to="/contact" className="btn btn-ghost btn-lg">Get in Touch <ChevronRight size={20} /></Link>
              <Link to="/products" className="btn btn-ghost btn-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>Our Products</Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Home;
