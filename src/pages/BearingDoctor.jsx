import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import './BearingDoctor.css';

const DIAGNOSIS_DATA = {
  symptoms: [
    { id: 'noise', label: 'Abnormal Noise', icon: '🔊' },
    { id: 'vibration', label: 'High Vibration', icon: '〰️' },
    { id: 'temp', label: 'Overheating', icon: '🌡️' },
    { id: 'visual', label: 'Visible Damage', icon: '👁️' },
  ],
  visual: {
    noise: [
      { id: 'squeak', label: 'Squeaking / Whining', desc: 'High-pitched noise during operation.' },
      { id: 'grind', label: 'Grinding / Crunching', desc: 'Harsh, metallic sound.' },
      { id: 'rattle', label: 'Rattling', desc: 'Loose components sound.' }
    ],
    vibration: [
      { id: 'constant_vib', label: 'Constant Vibration', desc: 'Steady vibration at all speeds.' },
      { id: 'speed_vib', label: 'Speed-dependent Vibration', desc: 'Worsens as RPM increases.' }
    ],
    temp: [
      { id: 'rapid_heat', label: 'Rapid Overheating', desc: 'Gets hot quickly after starting.' },
      { id: 'steady_heat', label: 'Gradual Overheating', desc: 'Slowly climbs above normal operating temp.' }
    ],
    visual: [
      { id: 'flaking', label: 'Flaking / Peeling', desc: 'Surface material chipping away.', img: '/images/flaking.jpg' },
      { id: 'rust', label: 'Rust / Corrosion', desc: 'Reddish-brown oxidation.', img: '/images/rust.jpg' },
      { id: 'scoring', label: 'Scoring / Smearing', desc: 'Deep scratches or metal smearing.', img: '/images/scoring.jpg' },
    ]
  },
  reports: {
    'squeak': { cause: 'Lack of lubrication or incorrect clearance.', action: 'Check lubricant level. Relubricate with proper grease.' },
    'grind': { cause: 'Contamination (dirt/metal particles) inside bearing.', action: 'Replace bearing. Improve sealing.' },
    'rattle': { cause: 'Excessive internal clearance or loose fit on shaft.', action: 'Check shaft/housing tolerances. Replace bearing.' },
    'constant_vib': { cause: 'Imbalance in the machine or bearing misalignment.', action: 'Re-align shafts. Check mounting.' },
    'speed_vib': { cause: 'Resonance or severe bearing wear (spalling).', action: 'Inspect bearing for flaking. Replace if damaged.' },
    'rapid_heat': { cause: 'Over-lubrication (too much grease) or too tight fit.', action: 'Remove excess grease. Check mounting tolerances.' },
    'steady_heat': { cause: 'Under-lubrication or wrong viscosity oil.', action: 'Add proper lubricant.' },
    'flaking': { cause: 'Fatigue life reached, or abnormal heavy load.', action: 'Replace bearing. Review load conditions.' },
    'rust': { cause: 'Water penetration or improper storage.', action: 'Replace bearing. Use better seals (RS/2RS).' },
    'scoring': { cause: 'Improper mounting, hitting the bearing with a hammer.', action: 'Replace bearing. Use proper mounting tools (induction heater/press).' },
  }
};

const BearingDoctor = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ symptom: null, detail: null });

  const handleSymptomSelect = (id) => {
    setSelections({ symptom: id, detail: null });
    setStep(2);
  };

  const handleDetailSelect = (id) => {
    setSelections(prev => ({ ...prev, detail: id }));
    setStep(3);
  };

  const restart = () => {
    setSelections({ symptom: null, detail: null });
    setStep(1);
  };

  const report = selections.detail ? DIAGNOSIS_DATA.reports[selections.detail] : null;

  return (
    <div className="doctor-page">
      <div className="doctor-hero">
        <div className="container doctor-hero-content">
          <div className="doctor-hero-header">
            <Stethoscope size={48} />
            <h1 className="doctor-hero-title">Bearing Doctor</h1>
          </div>
          <p className="doctor-hero-desc">
            Interactive diagnostic tool to troubleshoot bearing failures, identify causes, and find solutions.
          </p>
        </div>
      </div>

      <div className="doctor-container">
        {/* Progress Bar */}
        <div className="doctor-progress">
          <div className="doctor-progress-bar">
            <div className={`doctor-step-node ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`doctor-step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`doctor-step-node ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`doctor-step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`doctor-step-node ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>

        <div className="doctor-wizard">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Main Symptom */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="doctor-step-title">What is the primary symptom?</h2>
                <div className="doctor-grid-2">
                  {DIAGNOSIS_DATA.symptoms.map(sym => (
                    <button 
                      key={sym.id}
                      onClick={() => handleSymptomSelect(sym.id)}
                      className="doctor-symptom-btn"
                    >
                      <span className="doctor-symptom-icon">{sym.icon}</span>
                      <span className="doctor-symptom-label">{sym.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Detail/Visual Selection */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              >
                <div className="doctor-header-row">
                  <button onClick={() => setStep(1)} className="doctor-back-btn">
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="doctor-step-title left">Select specific issue</h2>
                </div>
                
                <div className="doctor-grid-3">
                  {DIAGNOSIS_DATA.visual[selections.symptom]?.map(detail => (
                    <button 
                      key={detail.id}
                      onClick={() => handleDetailSelect(detail.id)}
                      className="doctor-detail-btn"
                    >
                      {detail.img ? (
                        <div className="doctor-detail-img">
                          <div className="doctor-detail-img-placeholder">Image: {detail.label}</div>
                        </div>
                      ) : (
                        <div className="doctor-detail-no-img">
                           No Image
                        </div>
                      )}
                      <div className="doctor-detail-content">
                        <h3 className="doctor-detail-title">{detail.label}</h3>
                        <p className="doctor-detail-desc">{detail.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Report */}
            {step === 3 && report && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              >
                <div className="doctor-report-header">
                  <div className="doctor-report-icon-wrap">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="doctor-report-title">Diagnostic Report</h2>
                  <p className="doctor-report-subtitle">Based on your selections, here is the likely issue.</p>
                </div>

                <div className="doctor-alert doctor-alert-danger">
                  <AlertTriangle className="doctor-alert-icon danger" size={24} />
                  <div className="doctor-alert-content">
                    <h3 className="doctor-alert-heading">Likely Cause</h3>
                    <p>{report.cause}</p>
                  </div>
                </div>

                <div className="doctor-alert doctor-alert-success">
                  <CheckCircle className="doctor-alert-icon success" size={24} />
                  <div className="doctor-alert-content">
                    <h3 className="doctor-alert-heading">Recommended Action</h3>
                    <p>{report.action}</p>
                  </div>
                </div>

                <div className="doctor-report-actions">
                  <button onClick={restart} className="btn btn-outline">
                    Start New Diagnosis
                  </button>
                  <p className="doctor-disclaimer">
                    Note: This tool provides general guidance. For severe issues, consult our technical team.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BearingDoctor;
