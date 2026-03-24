export const tokens = {
    colors: {
        primary: '#0033FF',
        secondary: '#626fcd',
        tertiary: '#ae1501',
        neutral: '#767683',
        background: '#0a0a0f',
        surface: '#111118',
        surfaceAlt: '#1a1a24'
    },
    font: {
        family: "'Space Grotesk', sans-serif",
        weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
        sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        }
    },
    radius: 0,
    spacing: {
        unit: 8 // px, spacing scale based on 8px
    }
} as const;

export type Tokens = typeof tokens;
