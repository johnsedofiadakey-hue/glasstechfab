import DOMPurify from 'dompurify';

/**
 * Sanitizes a string by removing all HTML tags and attributes.
 * Useful for plain text inputs like chat messages or names.
 * 
 * @param {string} input - The string to sanitize.
 * @returns {string} The sanitized plain text string.
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

/**
 * Sanitizes an HTML string using DOMPurify with default settings.
 * Useful for rendering rich text or HTML content safely.
 * 
 * @param {string} input - The HTML string to sanitize.
 * @returns {string} The sanitized HTML string.
 */
export const sanitizeHTML = (input) => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input);
};
