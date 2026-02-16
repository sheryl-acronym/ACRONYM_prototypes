/**
 * Neutral grey color palette for ACRONYM
 * Uses pure neutral greys (0 saturation) without blue tints
 */

export const NEUTRAL_GREYS = {
  // Pure neutral greys - 0 saturation, varying lightness
  'grey-50': 'hsl(0 0% 98%)',   // Very light grey
  'grey-100': 'hsl(0 0% 96%)',  // Extra light grey
  'grey-150': 'hsl(0 0% 93%)',  // Light grey
  'grey-200': 'hsl(0 0% 90%)',  // Light grey (borders)
  'grey-300': 'hsl(0 0% 85%)',  // Medium-light grey
  'grey-400': 'hsl(0 0% 70%)',  // Medium grey
  'grey-500': 'hsl(0 0% 55%)',  // Medium grey
  'grey-600': 'hsl(0 0% 45%)',  // Medium-dark grey
  'grey-700': 'hsl(0 0% 30%)',  // Dark grey
  'grey-800': 'hsl(0 0% 15%)',  // Extra dark grey
  'grey-900': 'hsl(0 0% 9%)',   // Nearly black
};

/**
 * CSS variable mappings for use in components
 * Apply these to :root in index.css
 */
export const GREY_CSS_VARS = {
  border: '0 0% 90%',           // Grey-200
  input: '0 0% 90%',            // Grey-200
  muted: '0 0% 96%',            // Grey-100
  mutedForeground: '0 0% 45%',  // Grey-600
  sidebar: {
    background: '0 0% 98%',     // Grey-50
    foreground: '0 0% 30%',     // Grey-700
    primary: '0 0% 9%',         // Grey-900
    accent: '0 0% 96%',         // Grey-100
    border: '0 0% 90%',         // Grey-200
  },
};
