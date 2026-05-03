import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Project-wide safety net for legacy/minified React references
window.React = React;

import { BrowserRouter } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("CRASH:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8F6F3', fontFamily: 'sans-serif', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1A1410', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 24, textAlign: 'center', maxWidth: 400 }}>
            An unexpected error occurred. Please reload the page. If this keeps happening, contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '12px 28px', background: '#1A1410', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}>
            Reload Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ marginTop: 24, fontSize: 11, color: '#cc0000', background: '#fff', padding: 16, borderRadius: 8, maxWidth: 600, overflow: 'auto', textAlign: 'left' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
