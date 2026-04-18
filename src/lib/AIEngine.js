import OpenAI from 'openai';

/**
 * AIEngine.js - The Intelligence Hub for Glasstech Fabrications.
 * This module handles automated proposal generation, design feasibility checks,
 * and project insight summaries using OpenAI.
 */

const env = import.meta.env;
const openai = new OpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Essential for client-side demo; logic should move to edge functions for prod
});

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
    const isComm = project.type === 'Commercial';
    return `
# Architectural Glass Proposal: ${project.title || 'Elite Project'}
## Scope of Fabrication
Precision fabrication and installation of high-spec glass systems.

### Key Deliverables:
1. **Structural Glazing**: High-performance units for ${project.specs?.dimensions || 'site specs'}.
2. **Material**: ${project.specs?.glassType || 'Tempered Security Glass'}.
3. **Safety**: Verified by Glasstech structural audit teams.

### Executive Summary:
Glasstech Fabrications will utilize proprietary precision-cutting and premium grade aluminum to ensure structural integrity and a premium industrial aesthetic.
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
