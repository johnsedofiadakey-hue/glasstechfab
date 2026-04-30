import OpenAI from 'openai';

/**
 * AIEngine.js - The Intelligence Hub for Glasstech Fabrications.
 * This module handles automated proposal generation, design feasibility checks,
 * and project insight summaries using OpenAI.
 */

const env = import.meta.env;
const hasAIKey = !!env.VITE_OPENAI_API_KEY && env.VITE_OPENAI_API_KEY !== 'your_openai_key_here';

const openai = hasAIKey ? new OpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Essential for client-side demo; logic should move to edge functions for prod
}) : null;

export const AIEngine = {
  /**
   * Generates a high-quality proposal draft based on project details.
   */
  async generateProposal(project) {
    if (!env.VITE_OPENAI_API_KEY || env.VITE_OPENAI_API_KEY === 'your_openai_key_here') {
      console.warn("[AI] No API Key detected. Using fallback template.");
      return this.useFallbackTemplate(project);
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert technical estimator for Glasstech Fabrications, a premium interior finishing and glass engineering firm in Ghana. Your task is to draft a professional, technical, and persuasive project proposal based on client specs. Use Markdown formatting. Highlight structural integrity, premium aesthetics, and technical precision."
          },
          {
            role: "user",
            content: `Draft a project proposal for:
            Title: ${project.title}
            Type: ${project.type}
            Materials: ${project.specs?.glassType}
            Dimensions: ${project.specs?.dimensions}
            
            Include:
            1. Executive Summary
            2. Scope of Technical Fabrication
            3. Material Performance Benchmarks
            4. Estimated Timeline (approx 4-6 weeks)
            5. Structural Sealing & Safety Standards (SGS)`
          }
        ],
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("[AI ERROR]:", error);
      return this.useFallbackTemplate(project);
    }
  },

  useFallbackTemplate(project) {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `
# PROJECT PROPOSAL: ${project.title?.toUpperCase() || 'GLASSTECH PRECISION SYSTEM'}
**Date:** ${date}  
**Reference ID:** LXF-${Math.floor(1000 + Math.random() * 9000)}  
**Status:** AI Generated Draft (Mock)

---

## 1. Executive Summary
This proposal outlines the technical and aesthetic integration of premium ${project.type || 'Architectural'} solutions for the **${project.title || 'Client Development'}**. Glasstech Fabrications aims to deploy industrial-grade precision engineering coupled with high-end finishing to ensure structural longevity and visual excellence.

## 2. Technical Scope of Fabrication
The proposed scope includes the engineering, supply, and precision-fitting of:
- **Structural Systems:** Custom-curated aluminum framework with anodic coating.
- **Glass Integration:** ${project.specs?.glassType || 'Low-E Tempered Security Glass'} tailored to site-specific environmental loads.
- **Precision Detailing:** Micro-tolerance alignment using laser-guided structural audits.

## 3. Material Performance Benchmarks
| Feature | Benchmark | Compliance |
|---------|-----------|------------|
| Wind Load Resistance | Up to 2.5 kPa | ASTM E330 |
| Thermal Performance | U-Value < 1.8 W/m²K | ISO 15099 |
| Acoustic Dampening | STC 35-40 dB | ASTM E90 |

## 4. Estimated Timeline
- **Phase A (Procurement & Fabrication):** 21-25 Business Days
- **Phase B (On-site Integration):** 10-14 Business Days
- **Phase C (QA & Structural Certification):** 3-5 Business Days

## 5. Structural Safety & Sustainability
All fabrications undergo a multi-point inspection by SGS-certified technicians. We utilize sustainable sourcing for our aluminum and recycled content in our structural glass units where possible, adhering to LEED-compliant standards.

---
*Authorized for review by Glasstech Intelligence Hub.*
    `;
  },

  /**
   * Estimates the complexity and risk of a fabrication project.
   */
  calculateProjectRisk(project) {
    let risk = 'Low';
    if (project.complexity > 7 || project.budget > 50000) risk = 'Medium';
    if (project.structuralRequirements || project.customCurvature) risk = 'High';
    return risk;
  }
};
