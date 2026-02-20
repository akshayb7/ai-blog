/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.amber.600'),
              '&:hover': {
                color: theme('colors.amber.700'),
              },
              textDecoration: 'none',
              fontWeight: '500',
            },
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: '700',
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.pink.50'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            // Table styles
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.300'),
            },
            'thead th': {
              verticalAlign: 'bottom',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            'tbody td': {
              verticalAlign: 'top',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.amber.400'),
              '&:hover': {
                color: theme('colors.amber.300'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.pink.400'),
              backgroundColor: 'rgba(219, 39, 119, 0.1)',
            },
            blockquote: {
              borderLeftColor: theme('colors.amber.500'),
              color: theme('colors.gray.400'),
            },
            // Dark mode table styles
            table: {
              borderColor: theme('colors.gray.600'),
            },
            thead: {
              borderBottomColor: theme('colors.gray.600'),
            },
            'thead th': {
              color: theme('colors.gray.200'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody td': {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}