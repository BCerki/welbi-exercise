import React from 'react';
import { styled, v } from './boomer' with { type: 'macro' };

export const ReactComponent = () => {
  return React.createElement('div', null, 'Hello React!');
};



// Simple styled components without complex macro system
export const Button = styled('button', {
  base: {
    backgroundColor: v('colors.primary'),
  },
  variants: {
    variant: {  
      primary: {
        backgroundColor: v('colors.primary'),
      },
    },
  },
},{
  name: 'Button',
});

export const Card = styled('div', {
  base: {
    border: `${v('borders.thin')} ${v('colors.border')}`,
    borderRadius: v('radii.sm'),
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: v('colors.surfacePrimary'),
      },
    },
  },
},{
  name: 'Card',
});

export const Box = styled('div', {
  base: {
    display: 'block',
  },
},{
  name: 'Box',
});

export const Typography = styled('p', {
  base: {
    margin: 0,
    fontFamily: v('fonts.sans'),
  },
  variants: {
    variant: {
      h1: {
        fontSize: v('fontSizes.5xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing4'),
      },
      h2: {
        fontSize: v('fontSizes.4xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing3'),
      },
      h3: {
        fontSize: v('fontSizes.3xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing3'),
      },
      h4: {
        fontSize: v('fontSizes.2xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      h5: {
        fontSize: v('fontSizes.xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      h6: {
        fontSize: v('fontSizes.lg'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      body1: {
        fontSize: v('fontSizes.base'),
        lineHeight: v('lineHeights.normal'),
      },
      body2: {
        fontSize: v('fontSizes.sm'),
        lineHeight: v('lineHeights.tight'),
      },
      caption: {
        fontSize: v('fontSizes.xs'),
        lineHeight: v('lineHeights.tight'),
      },
    },
    fontSize: {
      xl: {
        fontSize: v('fontSizes.xl'),
      },
      lg: {
        fontSize: v('fontSizes.lg'),
      },
      base: {
        fontSize: v('fontSizes.base'),
      },
      sm: {
        fontSize: v('fontSizes.sm'),
      },
    },
    fontWeight: {
      normal: {
        fontWeight: v('fontWeights.normal'),
      },
      bold: {
        fontWeight: v('fontWeights.bold'),
      },
    },
    color: {
      primary: { color: v('colors.primary') },
      secondary: { color: v('colors.secondary') },
      error: { color: v('colors.error') },
      success: { color: v('colors.success') },
      warning: { color: v('colors.warning') },
      muted: { color: v('colors.textMuted') },
      white: { color: v('colors.white') },
    },
    gutterBottom: {
      true: {
        marginBottom: v('sizes.spacing1'),
      },
    },
    noMargin: {
      true: {
        margin: 0,
        marginBottom: 0,
      },
    },
    grow: {
      true: {
        flexGrow: 1,
      },
    },
  },
},{
  name: 'Typography',
});

// Heading component that renders as h1 but supports the same variants as Typography
export const Heading = styled('h1', {
  base: {
    margin: 0,
    fontFamily: v('fonts.sans'),
  },
  variants: {
    variant: {
      h1: {
        fontSize: v('fontSizes.5xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing4'),
      },
      h2: {
        fontSize: v('fontSizes.4xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing3'),
      },
      h3: {
        fontSize: v('fontSizes.3xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing3'),
      },
      h4: {
        fontSize: v('fontSizes.2xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      h5: {
        fontSize: v('fontSizes.xl'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      h6: {
        fontSize: v('fontSizes.lg'),
        fontWeight: v('fontWeights.bold'),
        marginBottom: v('sizes.spacing2'),
      },
      body1: {
        fontSize: v('fontSizes.base'),
        lineHeight: v('lineHeights.normal'),
      },
      body2: {
        fontSize: v('fontSizes.sm'),
       lineHeight: v('lineHeights.tight'),
      },
      caption: {
        fontSize: v('fontSizes.xs'),
        lineHeight: v('lineHeights.tight'),
      },
    },
    color: {
      primary: { color: v('colors.primary') },
      secondary: { color: v('colors.secondary') },
      error: { color: v('colors.error') },
      success: { color: v('colors.success') },
      warning: { color: v('colors.warning') },
      muted: { color: v('colors.textMuted') },
      white: { color: v('colors.white') },
    },
    gutterBottom: {
      true: {
        marginBottom: v('sizes.spacing1'),
      },
    },
    noMargin: {
      true: {
        margin: 0,
        marginBottom: 0,
      },
    },
  },
},{
  name: 'Heading',
});

export const CardContent = styled('div', {
  base: {
    padding: v('sizes.spacing4'),
  },
});

export const AppBar = styled('header', {
  base: {
    backgroundColor: v('colors.surfacePrimary'),
    color: v('colors.text'),
    boxShadow: v('shadows.appBar'),
    position: 'static',
  },
  variants: {
    position: {
      fixed: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: v('zIndices.appBar'),
      },
      static: {
        position: 'static',
      },
    },
  },
},{
  name: 'AppBar',
});

export const Toolbar = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${v('sizes.containerPaddingLg')}`,
    minHeight: v('sizes.toolbarHeight'),
  },
  variants: {
    gap: {
      xs: { gap: v('sizes.spacingXs') },
      sm: { gap: v('sizes.spacing2') },
      md: { gap: v('sizes.spacing4') },
      lg: { gap: v('sizes.spacing6') },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },
  },
},{
  name: 'Toolbar',
});

export const Container = styled('div', {
  base: {
    width: v('sizes.full'),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: v('sizes.containerPadding'),
    paddingRight: v('sizes.containerPadding'),
  },
  variants: {
    maxWidth: {
      xs: {
        maxWidth: v('sizes.xs'),
      },
      sm: {
        maxWidth: v('sizes.sm'),
      },
      md: {
        maxWidth: v('sizes.md'),
      },
      lg: {
        maxWidth: v('sizes.lg'),
      },
      xl: {
        maxWidth: v('sizes.xl'),
      },
    },
    sx: {
      'mt-4': {
        marginTop: v('sizes.spacing8'),
      },
    },
  },
},{
  name: 'Container',
});

export const Grid = styled('div', {
  base: {
    display: 'grid',
  },
  variants: {
    columns: {
      1: { gridTemplateColumns: 'repeat(1, 1fr)' },
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
      5: { gridTemplateColumns: 'repeat(5, 1fr)' },
      6: { gridTemplateColumns: 'repeat(6, 1fr)' },
      7: { gridTemplateColumns: 'repeat(7, 1fr)' },
      12: { gridTemplateColumns: 'repeat(12, 1fr)' },
    },
    gap: {
      0: { gap: '0' },
      1: { gap: v('sizes.spacing1') },
      2: { gap: v('sizes.spacing2') },
      3: { gap: v('sizes.spacing3') },
      4: { gap: v('sizes.spacing4') },
      6: { gap: v('sizes.spacing6') },
      8: { gap: v('sizes.spacing8') },
    },
    rows: {
      auto: { gridTemplateRows: 'auto' },
      equal: { gridAutoRows: '1fr' },
    },
  },
},{
  name: 'Grid',
});

export const GridItem = styled('div', {
  base: {
    display: 'block',
  },
  variants: {
    colSpan: {
      1: { gridColumn: 'span 1' },
      2: { gridColumn: 'span 2' },
      3: { gridColumn: 'span 3' },
      4: { gridColumn: 'span 4' },
      5: { gridColumn: 'span 5' },
      6: { gridColumn: 'span 6' },
      7: { gridColumn: 'span 7' },
      8: { gridColumn: 'span 8' },
      9: { gridColumn: 'span 9' },
      10: { gridColumn: 'span 10' },
      11: { gridColumn: 'span 11' },
      12: { gridColumn: 'span 12' },
    },
    rowSpan: {
      1: { gridRow: 'span 1' },
      2: { gridRow: 'span 2' },
      3: { gridRow: 'span 3' },
      4: { gridRow: 'span 4' },
    },
  },
},{
  name: 'GridItem',
});

// Status Badge Component
export const StatusBadge = styled('div', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${v('sizes.spacingXs')} ${v('sizes.spacing3')}`,
    borderRadius: v('radii.lg'),
    fontSize: v('fontSizes.sm'),
    fontWeight: v('fontWeights.bold'),
    color: v('colors.white'),
  },
  variants: {
    status: {
      scheduled: {
        backgroundColor: v('colors.primary'),
      },
      completed: {
        backgroundColor: v('colors.success'),
      },
      cancelled: {
        backgroundColor: v('colors.error'),
      },
      warning: {
        backgroundColor: v('colors.warning'),
      },
      info: {
        backgroundColor: v('colors.info'),
      },
    },
  },
}, {
  name: 'StatusBadge',
});

// Info Box Component
export const InfoBox = styled('div', {
  base: {
    padding: v('sizes.spacing4'),
    borderRadius: v('radii.md'),
  },
  variants: {
    variant: {
      default: {
        backgroundColor: v('colors.surfaceSecondary'),
      },
      warning: {
        backgroundColor: v('colors.surfaceWarning'),
      },
      success: {
        backgroundColor: v('colors.surfaceSuccess'),
      },
      error: {
        backgroundColor: v('colors.surfaceError'),
      },
      tertiary: {
        backgroundColor: v('colors.surfaceTertiary'),
      },
    },
  },
}, {
  name: 'InfoBox',
});

// Progress Bar Components
export const ProgressBar = styled('div', {
  base: {
    width: v('sizes.full'),
    height: v('sizes.spacingXs'),
    backgroundColor: v('colors.border'),
    borderRadius: v('radii.sm'),
    overflow: 'hidden',
  },
}, {
  name: 'ProgressBar',
});

export const ProgressBarFill = styled('div', {
  base: {
    height: v('sizes.full'),
    backgroundColor: v('colors.primary'),
    transition: 'width 0.3s ease',
  },
}, {
  name: 'ProgressBarFill',
});

// Action Button Component
export const ActionButton = styled('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${v('sizes.spacing3')} ${v('sizes.spacing6')}`,
    backgroundColor: v('colors.primary'),
    color: v('colors.white'),
    border: 'none',
    borderRadius: v('radii.md'),
    fontSize: v('fontSizes.base'),
    fontWeight: v('fontWeights.bold'),
    cursor: 'pointer',
    fontFamily: v('fonts.sans'),
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: v('colors.primary'),
        color: v('colors.white'),
      },
      secondary: {
        backgroundColor: v('colors.secondary'),
        color: v('colors.white'),
      },
      danger: {
        backgroundColor: v('colors.error'),
        color: v('colors.white'),
      },
      success: {
        backgroundColor: v('colors.success'),
        color: v('colors.white'),
      },
    },
    size: {
      small: {
        padding: `${v('sizes.spacing2')} ${v('sizes.spacing4')}`,
        fontSize: v('fontSizes.sm'),
      },
      medium: {
        padding: `${v('sizes.spacing3')} ${v('sizes.spacing6')}`,
        fontSize: v('fontSizes.base'),
      },
      large: {
        padding: `${v('sizes.spacing4')} ${v('sizes.spacing8')}`,
        fontSize: v('fontSizes.lg'),
      },
    },
  },
}, {
  name: 'ActionButton',
});

// Page Container Component
export const PageContainer = styled('div', {
  base: {
    padding: v('sizes.spacing6'),
    maxWidth: '1200px',
    margin: '0 auto',
  },
}, {
  name: 'PageContainer',
});

// Spacing Components
export const Spacer = styled('div', {
  base: {},
  variants: {
    size: {
      xs: { marginBottom: v('sizes.spacingXs') },
      sm: { marginBottom: v('sizes.spacing2') },
      md: { marginBottom: v('sizes.spacing4') },
      lg: { marginBottom: v('sizes.spacing6') },
      xl: { marginBottom: v('sizes.spacing8') },
    },
    direction: {
      horizontal: {},
      vertical: {},
    },
  },
  compoundVariants: [
    {
      variants: { direction: 'horizontal', size: 'xs' },
      styles: { marginBottom: 0, marginRight: v('sizes.spacingXs') },
    },
    {
      variants: { direction: 'horizontal', size: 'sm' },
      styles: { marginBottom: 0, marginRight: v('sizes.spacing2') },
    },
    {
      variants: { direction: 'horizontal', size: 'md' },
      styles: { marginBottom: 0, marginRight: v('sizes.spacing4') },
    },
    {
      variants: { direction: 'horizontal', size: 'lg' },
      styles: { marginBottom: 0, marginRight: v('sizes.spacing6') },
    },
    {
      variants: { direction: 'horizontal', size: 'xl' },
      styles: { marginBottom: 0, marginRight: v('sizes.spacing8') },
    },
  ],
}, {
  name: 'Spacer',
});

// Flex Container Component
export const Flex = styled('div', {
  base: {
    display: 'flex',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
    },
    gap: {
      xs: { gap: v('sizes.spacingXs') },
      sm: { gap: v('sizes.spacing2') },
      md: { gap: v('sizes.spacing4') },
      lg: { gap: v('sizes.spacing6') },
      xl: { gap: v('sizes.spacing8') },
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
  },
}, {
  name: 'Flex',
});

// Select/Dropdown Component
export const Select = styled('select', {
  base: {
    padding: `${v('sizes.spacing1')} ${v('sizes.spacing2')}`,
    borderRadius: v('radii.sm'),
    border: `${v('borders.thin')} ${v('colors.border')}`,
    fontSize: v('fontSizes.sm'),
    backgroundColor: v('colors.white'),
    cursor: 'pointer',
    fontFamily: v('fonts.sans'),
    color: v('colors.text'),
    '&:focus': {
      outline: `2px solid ${v('colors.primary')}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      small: {
        padding: `${v('sizes.spacingXs')} ${v('sizes.spacing2')}`,
        fontSize: v('fontSizes.xs'),
      },
      medium: {
        padding: `${v('sizes.spacing1')} ${v('sizes.spacing2')}`,
        fontSize: v('fontSizes.sm'),
      },
      large: {
        padding: `${v('sizes.spacing2')} ${v('sizes.spacing3')}`,
        fontSize: v('fontSizes.base'),
      },
    },
    fullWidth: {
      true: {
        width: v('sizes.full'),
      },
    },
    minWidth: {
      sm: { minWidth: '140px' },
      md: { minWidth: '180px' },
      lg: { minWidth: '220px' },
    },
  },
}, {
  name: 'Select',
});

// Dev Auth Container - specialized Box for authentication widgets
export const DevAuthContainer = styled('div', {
  base: {
    backgroundColor: v('colors.surfaceTertiary'),
    padding: `${v('sizes.spacing2')} ${v('sizes.spacing4')}`,
    borderRadius: v('radii.md'),
    display: 'flex',
    alignItems: 'center',
    gap: v('sizes.spacing3'),
  },
}, {
  name: 'DevAuthContainer',
});

// Text variant for small labels in UI chrome (like toolbars, badges)
export const Label = styled('span', {
  base: {
    fontSize: v('fontSizes.sm'),
    margin: 0,
    fontFamily: v('fonts.sans'),
    lineHeight: v('lineHeights.tight'),
  },
  variants: {
    size: {
      xs: {
        fontSize: v('fontSizes.xs'),
      },
      sm: {
        fontSize: v('fontSizes.sm'),
      },
      base: {
        fontSize: v('fontSizes.base'),
      },
    },
    color: {
      default: {
        color: v('colors.text'),
      },
      white: {
        color: v('colors.white'),
      },
      muted: {
        color: v('colors.textMuted'),
      },
      primary: {
        color: v('colors.primary'),
      },
    },
  },
}, {
  name: 'Label',
});