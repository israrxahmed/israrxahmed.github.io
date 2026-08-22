/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Core semantic colors */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        /* Primary scale */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        /* Secondary scale */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        /* Destructive/Error */
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        /* Muted scale */
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        /* Accent */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        /* Popover */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        /* Card */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        /* Background scale */
        bg: {
          primary: "hsl(var(--bg-primary))",
          secondary: "hsl(var(--bg-secondary))",
          tertiary: "hsl(var(--bg-tertiary))",
          elevated: "hsl(var(--bg-elevated))",
        },
        
        /* Foreground scale */
        fg: {
          primary: "hsl(var(--fg-primary))",
          secondary: "hsl(var(--fg-secondary))",
          tertiary: "hsl(var(--fg-tertiary))",
          disabled: "hsl(var(--fg-disabled))",
        },
        
        /* Surface scale */
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
          floating: "hsl(var(--surface-floating))",
        },
        
        /* Cyan scale */
        cyan: {
          DEFAULT: 'rgb(var(--cyan-rgb) / <alpha-value>)',
          50: '#E6FEFF',
          100: '#CCFDFF',
          200: '#99FBFF',
          300: '#66F9FF',
          400: 'rgb(51 246 255 / <alpha-value>)',
          500: 'rgb(var(--cyan-rgb) / <alpha-value>)',
          600: '#00C0CC',
          700: '#009099',
          800: '#006066',
          900: '#003033',
        },

        /* Violet scale */
        violet: {
          DEFAULT: 'rgb(var(--violet-rgb) / <alpha-value>)',
          50: '#F0E6FF',
          100: '#E1CCFF',
          200: '#C399FF',
          300: '#A566FF',
          400: 'rgb(135 51 255 / <alpha-value>)',
          500: 'rgb(var(--violet-rgb) / <alpha-value>)',
          600: '#5A00CC',
          700: '#430099',
          800: '#2D0066',
          900: '#160033',
        },
        
        /* Void color */
        void: {
          DEFAULT: 'var(--void)',
          light: 'var(--void-light)',
        },
        
        /* Semantic colors */
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          light: "hsl(var(--error-light))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: '1.5' }],
        'sm': ['var(--text-sm)', { lineHeight: '1.5' }],
        'base': ['var(--text-base)', { lineHeight: '1.6' }],
        'lg': ['var(--text-lg)', { lineHeight: '1.6' }],
        'xl': ['var(--text-xl)', { lineHeight: '1.4' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.3' }],
        '3xl': ['var(--text-3xl)', { lineHeight: '1.2' }],
        '4xl': ['var(--text-4xl)', { lineHeight: '1.1' }],
        '5xl': ['var(--text-5xl)', { lineHeight: '1.1' }],
        '6xl': ['var(--text-6xl)', { lineHeight: '1' }],
        '7xl': ['var(--text-7xl)', { lineHeight: '1' }],
      },
      
      spacing: {
        '0': 'var(--space-0)',
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      
      borderRadius: {
        'sm': "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        'lg': "var(--radius-lg)",
        'xl': "var(--radius-xl)",
      },
      
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'glow': 'var(--glow-cyan)',
        'glow-lg': 'var(--glow-cyan-lg)',
        'glow-violet': 'var(--glow-violet)',
        'glow-violet-lg': 'var(--glow-violet-lg)',
        'glow-mixed': 'var(--glow-mixed)',
        'glass': 'var(--shadow-lg)',
        'neon': '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.2)',
        'neon-violet': '0 0 20px rgba(112, 0, 255, 0.3), 0 0 40px rgba(112, 0, 255, 0.2)',
      },
      
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        'out-quart': 'var(--ease-out-quart)',
        'out-back': 'var(--ease-out-back)',
        'in-out-sine': 'var(--ease-in-out-sine)',
        'spring': 'var(--ease-spring)',
      },
      
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'slower': 'var(--duration-slower)',
        'slowest': 'var(--duration-slowest)',
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          from: { boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)" },
          to: { boxShadow: "0 0 30px rgba(0, 240, 255, 0.6), 0 0 50px rgba(0, 240, 255, 0.4)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "shine": {
          to: { backgroundPosition: "200% center" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shine": "shine 3s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, var(--cyan), var(--violet))',
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
