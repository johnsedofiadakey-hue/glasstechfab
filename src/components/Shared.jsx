import React from 'react';
import { X, Check, DollarSign } from 'lucide-react';

export const Av = ({ i, s = 36, c = '#C8A96E' }) => (
  <div style={{
    width: s,
    height: s,
    borderRadius: '50%',
    background: `${c}18`,
    border: `1px solid ${c}32`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: s * .32,
    fontWeight: 600,
    color: c,
    fontFamily: "'DM Sans',sans-serif",
    flexShrink: 0
  }}>{i}</div>
);

export const SBadge = ({ s }) => <span className={`sb s-${(s || '').toLowerCase().replace(/\s/g, '')}`}>{s}</span>;

export function Modal({ open, onClose, title, children, w = 520 }) {
  if (!open) return null;
  return (
    <div className="overlay-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box lxf" style={{ maxWidth: w }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#DDD' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#444', padding: 4, display: 'flex' }}><X size={17} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FF({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 10, color: '#484848', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5, fontFamily: "'DM Sans',sans-serif" }}>{label}</label>
      {children}
    </div>
  );
}

export const PAv = Av;
export const PSBadge = SBadge;
export const PModal = Modal;

export const Spinner = () => <div style={{ width: 15, height: 15, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }} className="spin" />;
