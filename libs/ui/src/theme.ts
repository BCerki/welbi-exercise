import { createConfig, globalCSS, createTheme } from './boomer' with { type: 'macro' };

export const { queries, themeTypeForV, queriesTypeForM, theme } = createConfig({
  queries: {
    // Viewport sizes
    phone: 'media (max-width: 480px)',
    mobile: 'media (max-width: 768px)',
    tablet: 'media (max-width: 1024px)',
    desktop: 'media (min-width: 1025px)',
    largeDesktop: 'media (min-width: 1440px)',
    ultraWide: 'media (min-width: 1920px)',
    
    // Orientation
    portrait: 'media (orientation: portrait)',
    landscape: 'media (orientation: landscape)',
    
    // Color scheme preferences
    darkMode: 'media (prefers-color-scheme: dark)',
    lightMode: 'media (prefers-color-scheme: light)',
    
    // Motion preferences
    reducedMotion: 'media (prefers-reduced-motion: reduce)',
    motionOk: 'media (prefers-reduced-motion: no-preference)',
    
    // Accessibility preferences
    highContrast: 'media (prefers-contrast: high)',
    lowContrast: 'media (prefers-contrast: low)',
    noPreferenceContrast: 'media (prefers-contrast: no-preference)',
    reducedTransparency: 'media (prefers-reduced-transparency: reduce)',
    noPreferenceTransparency: 'media (prefers-reduced-transparency: no-preference)',
    forcedColors: 'media (forced-colors: active)',
    noForcedColors: 'media (forced-colors: none)',
    
    // Display capabilities
    canHover: 'media (hover: hover)',
    noHover: 'media (hover: none)',
    noPointer: 'media (pointer: none)',
    anyHover: 'media (any-hover: hover)',
    anyPointer: 'media (any-pointer: fine)',
    anyCoarsePointer: 'media (any-pointer: coarse)',
    
    // Resolution/pixel density
    standardDPI: 'media (resolution: 1dppx)',
    highDPI: 'media (resolution >= 2dppx)',
    veryHighDPI: 'media (resolution >= 3dppx)',
    retina: 'media (-webkit-min-device-pixel-ratio: 2)',
    
    // Print media
    print: 'media print',
    screen: 'media screen',
    
    // Display modes (for PWAs)
    standalone: 'media (display-mode: standalone)',
    fullscreen: 'media (display-mode: fullscreen)',
    minimalUI: 'media (display-mode: minimal-ui)',
    browser: 'media (display-mode: browser)',
    
    // Data preferences
    reducedData: 'media (prefers-reduced-data: reduce)',
    noPreferenceData: 'media (prefers-reduced-data: no-preference)',
  },
  theme: {
    darkMode:{
      colors: {
        primary: '#90caf9',
        secondary: '#f48fb1',
        error: '#f44336',
        success: '#66bb6a',
        warning: '#ffb74d',
        info: '#ba68c8',
        white: '#121212',
        black: '#ffffff',
        text: 'rgba(255, 255, 255, 0.87)',
        textMuted: 'rgba(255, 255, 255, 0.6)',
        border: '#424242',
        surfacePrimary: '#1e3a8a',
        surfaceSecondary: '#2e2e2e',
        surfaceTertiary: '#383838',
        surfaceWarning: '#332a0a',
        surfaceSuccess: '#1b2e1b',
        surfaceError: '#332020',
      },
    },
    mobile: {
      fontSizes: {
        xxs: '0.5rem',
        xs: '0.625rem',
        sm: '0.75rem',
        base: '0.875rem',
        lg: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '1.75rem',
        '5xl': '2rem',
      },
      sizes: {
        containerPadding: '12px',
        containerPaddingLg: '16px',
        spacing1: '0.25em',
        spacing2: '0.375rem',
        spacing3: '0.5rem',
        spacing4: '0.75rem',
        spacing6: '1rem',
        spacing8: '1.5rem',
        toolbarHeight: '56px',
      },
    },
    tablet: {
      sizes: {
        containerPadding: '20px',
        containerPaddingLg: '28px',
        toolbarHeight: '60px',
      },
    },
    highContrast: {
      colors: {
        primary: '#0000ff',
        secondary: '#ff0000',
        error: '#ff0000',
        success: '#00ff00',
        warning: '#ff8800',
        info: '#0088ff',
        text: '#000000',
        textMuted: '#333333',
        border: '#000000',
        surfaceSecondary: '#f0f0f0',
        surfaceTertiary: '#e0e0e0',
        surfaceWarning: '#fff8e1',
        surfaceSuccess: '#e8f5e8',
        surfaceError: '#ffebee',
      },
      borders: {
        thin: '2px solid',
      },
    },
    print: {
      colors: {
        primary: '#000000',
        secondary: '#000000',
        error: '#000000',
        success: '#000000',
        warning: '#000000',
        info: '#000000',
        text: '#000000',
        textMuted: '#333333',
        border: '#000000',
        white: '#ffffff',
        black: '#000000',
        surfacePrimary: '#ffffff',
        surfaceSecondary: '#ffffff',
        surfaceTertiary: '#ffffff',
        surfaceWarning: '#ffffff',
        surfaceSuccess: '#ffffff',
        surfaceError: '#ffffff',
      },
      fontSizes: {
        xs: '8pt',
        sm: '9pt',
        base: '10pt',
        lg: '11pt',
        xl: '12pt',
        '2xl': '14pt',
        '3xl': '16pt',
        '4xl': '18pt',
        '5xl': '24pt',
      },
      shadows: {
        appBar: 'none',
      },
    },
    reducedMotion: {
      // Override any animation/transition tokens when they're added
    },
    reducedTransparency: {
      colors: {
        text: 'rgb(0, 0, 0)',
        textMuted: '#666666',
        surfacePrimary: '#e3f2fd',
        surfaceSecondary: '#f5f5f5',
        surfaceTertiary: '#f0f0f0',
        surfaceWarning: '#fff3e0',
        surfaceSuccess: '#e8f5e8',
        surfaceError: '#ffeaea',
      },
    },
    forcedColors: {
      colors: {
        primary: 'ButtonText',
        secondary: 'ButtonText',
        error: 'ButtonText',
        success: 'ButtonText',
        warning: 'ButtonText',
        info: 'ButtonText',
        text: 'WindowText',
        textMuted: 'GrayText',
        border: 'ButtonBorder',
        white: 'Window',
        black: 'WindowText',
        surfacePrimary: 'Window',
        surfaceSecondary: 'Window',
        surfaceTertiary: 'Window',
        surfaceWarning: 'Window',
        surfaceSuccess: 'Window',
        surfaceError: 'Window',
      },
    },
    largeDesktop: {
      fontSizes: {
        xxs: '0.75rem',
        xs: '0.875rem',
        sm: '1rem',
        base: '1.125rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.625rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      sizes: {
        containerPadding: '32px',
        containerPaddingLg: '48px',
        spacing1: '0.5em',
        spacing2: '0.625rem',
        spacing3: '1rem',
        spacing4: '1.25rem',
        spacing6: '2rem',
        spacing8: '2.75rem',
        toolbarHeight: '72px',
      },
    },
    base: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        error: '#d32f2f',
        success: '#2e7d32',
        warning: '#ff9800',
        info: '#9c27b0',
        white: '#ffffff',
        black: '#000000',
        text: 'rgba(0, 0, 0, 0.87)',
        textMuted: '#666666',
        border: '#ccc',
        surfacePrimary: '#e3f2fd',
        surfaceSecondary: '#f9f9f9',
        surfaceTertiary: '#f5f5f5',
        surfaceWarning: '#fff3e0',
        surfaceSuccess: '#e8f5e8',
        surfaceError: '#ffeaea',
      },
      fontSizes: {
        xxs: '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        html: '100%',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontWeights: {
        normal: '400',
        bold: '700',
      },
      lineHeights: {
        tight: '1.4',
        normal: '1.5',
      },
      fonts: {
        sans: 'system-ui, -apple-system, sans-serif',
      },
      sizes: {
        xs: '444px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
        full: '100%',
        toolbarHeight: '64px',
        spacingXxs: '0.125rem',
        spacingXs: '0.25rem',
        spacing1: '0.35em',
        spacing2: '0.5rem',
        spacing3: '0.75rem',
        spacing4: '1rem',
        spacing6: '1.5rem',
        spacing8: '2rem',
        calendarDayHeight: '160px',
        eventDotSize: '8px',
        containerPadding: '16px',
        containerPaddingLg: '24px',
      },
      radii: {
        xs: '3px',
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      shadows: {
        appBar: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
      borders: {
        thin: '1px solid',
      },
      zIndices: {
        appBar: '1100',
      },
    },
  },
});

globalCSS({
  // CSS Reset
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
  },
  '*::before': {
    boxSizing: 'border-box',
  },
  '*::after': {
    boxSizing: 'border-box',
  },
  'html': {
    backgroundColor: theme.colors.white,
    lineHeight: '1.15',
    WebkitTextSizeAdjust: '100%',
    scrollBehavior: 'smooth',
  },
  'body': {
    backgroundColor: theme.colors.white,
    color: theme.colors.text,
    fontFamily: theme.fonts.sans,
    lineHeight: theme.lineHeights.normal,
    overflowY: 'scroll',
  },
  'main': {
    display: 'block',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  'p, blockquote, dl, dd, ol, ul, figure, hr, fieldset, legend': {
    margin: '0',
  },
  'ol, ul': {
    listStyle: 'none',
  },
  'button, input, optgroup, select, textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: '1.15',
    margin: '0',
  },
  'button, input': {
    overflow: 'visible',
  },
  'button, select': {
    textTransform: 'none',
  },
  'button, [type="button"], [type="reset"], [type="submit"]': {
    webkitAppearance: 'button',
    backgroundColor: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
  'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: '0',
  },
  'button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring': {
    outline: '1px dotted ButtonText',
  },
  'fieldset': {
    border: '1px solid #c0c0c0',
    margin: '0 2px',
    padding: '0.35em 0.625em 0.75em',
  },
  'legend': {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: '0',
    whiteSpace: 'normal',
  },
  'textarea': {
    overflow: 'auto',
  },
  '[type="checkbox"], [type="radio"]': {
    boxSizing: 'border-box',
    padding: '0',
  },
  '[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button': {
    height: 'auto',
  },
  '[type="search"]': {
    webkitAppearance: 'textfield',
    outlineOffset: '-2px',
  },
  '[type="search"]::-webkit-search-decoration': {
    webkitAppearance: 'none',
  },
  '::-webkit-file-upload-button': {
    webkitAppearance: 'button',
    font: 'inherit',
  },
  'img': {
    borderStyle: 'none',
    maxWidth: '100%',
    height: 'auto',
  },
  'svg': {
    overflow: 'hidden',
  },
  'a': {
    backgroundColor: 'transparent',
    textDecoration: 'none',
    color: 'inherit',
  },
  'a:hover': {
    textDecoration: 'underline',
  },
  'table': {
    borderCollapse: 'collapse',
    borderSpacing: '0',
  },
  'td, th': {
    padding: '0',
  },
})

export function initTheme() {
  // Allow manual theme override via localStorage ("ui-theme": "light" | "dark" | "system")
  try {
    const preference = (localStorage.getItem('ui-theme') || 'system') as 'light' | 'dark' | 'system'

    const apply = (pref: 'light' | 'dark' | 'system') => {
      document.documentElement.classList.remove('tw-dark')
      document.documentElement.classList.remove('tw-light')
      if (pref === 'dark') {
        document.documentElement.classList.add('tw-dark')
      } else if (pref === 'light') {
        document.documentElement.classList.add('tw-light')
      }
    }

    // Create a CSS theme class that mirrors our dark tokens for manual override
    createTheme('tw-dark', {
      colors: {
        primary: '#90caf9',
        secondary: '#f48fb1',
        error: '#f44336',
        success: '#66bb6a',
        warning: '#ffb74d',
        info: '#ba68c8',
        white: '#121212',
        black: '#ffffff',
        text: 'rgba(255, 255, 255, 0.87)',
        textMuted: 'rgba(255, 255, 255, 0.6)',
        border: '#424242',
        surfacePrimary: '#1e3a8a',
        surfaceSecondary: '#2e2e2e',
        surfaceTertiary: '#383838',
        surfaceWarning: '#332a0a',
        surfaceSuccess: '#1b2e1b',
        surfaceError: '#332020',
      },
    })

    // Create a light theme class mirroring base tokens for forcing light mode
    createTheme('tw-light', {
      colors: {
        primary: theme.colors.primary.value,
        secondary: theme.colors.secondary.value,
        error: theme.colors.error.value,
        success: theme.colors.success.value,
        warning: theme.colors.warning.value,
        info: theme.colors.info.value,
        white: theme.colors.white.value,
        black: theme.colors.black.value,
        text: theme.colors.text.value,
        textMuted: theme.colors.textMuted.value,
        border: theme.colors.border.value,
        surfacePrimary: theme.colors.surfacePrimary.value,
        surfaceSecondary: theme.colors.surfaceSecondary.value,
        surfaceTertiary: theme.colors.surfaceTertiary.value,
        surfaceWarning: theme.colors.surfaceWarning.value,
        surfaceSuccess: theme.colors.surfaceSuccess.value,
        surfaceError: theme.colors.surfaceError.value,
      },
    })

    if (preference === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mql.matches ? 'dark' : 'light')
      mql.addEventListener('change', (e) => apply(e.matches ? 'dark' : 'light'))
    } else {
      apply(preference)
    }
  } catch {
    // no-op if not available (SSR or privacy settings)
  }
}