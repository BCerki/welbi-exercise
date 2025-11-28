# Challenge 10: Advanced Internationalization System

**Difficulty**: Medium-Hard  
**Estimated Time**: 3-4 hours  
**Type**: Full-stack library implementation with React integration

## Context

The Welbi wellness platform needs to support multiple languages for their global user base. Currently, the `@testwelbi/locales` library exists as a basic placeholder. Your task is to implement a comprehensive internationalization system using i18next that integrates seamlessly with the existing React frontend and GraphQL backend.

## Current State

The `@testwelbi/locales` library contains:
- Basic locale definitions (English, French, Spanish)
- Simple utility functions 
- Placeholder implementation without actual i18next integration

## Requirements

### 1. Core i18next Integration
- Implement proper i18next configuration with namespace support
- Set up react-i18next integration for the frontend
- Create translation resource loading system
- Implement automatic locale detection with fallbacks

### 2. Translation Resources
- Create comprehensive translation files for at least 3 languages (en, fr, es)
- Include translations for common UI elements, forms, and error messages
- Add domain-specific translations for wellness/healthcare terminology
- Support for pluralization rules and context-based translations

### 3. Backend Integration
- Extend GraphQL schema to support localized content
- Implement server-side translation utilities
- Add locale-aware error message formatting
- Support for date/time localization using the existing `@testwelbi/time` library

### 4. Advanced Features
- Implement lazy loading of translation resources
- Add support for interpolation and formatting (numbers, dates, currencies)
- Create translation management utilities for developers
- Support for RTL languages (Arabic preparation)

### 5. React Integration
- Create reusable translation hooks and components
- Implement locale switching functionality
- Add translation-aware form validation
- Ensure Material UI components are properly localized

## Deliverables

### Library Implementation (`libs/locales/`)
- [ ] Complete i18next configuration
- [ ] Translation resource structure and loading
- [ ] React hooks: `useTranslation`, `useLocale`, `useChangeLocale`
- [ ] Higher-order components and utilities
- [ ] Server-side translation utilities

### Translation Resources (`libs/locales/locales/`)
```
locales/
├── en/
│   ├── common.json
│   ├── forms.json
│   ├── wellness.json
│   └── errors.json
├── fr/
│   └── ...
└── es/
    └── ...
```

### Frontend Integration (`apps/frontend/`)
- [ ] Locale provider setup in app root
- [ ] Locale switching UI component
- [ ] At least 5 pages fully translated
- [ ] Form validation messages localized
- [ ] Date/time display localization

### GraphQL Integration (`apps/graphql/`)
- [ ] Schema extensions for localized content
- [ ] Context-aware error message localization
- [ ] Accept-Language header processing
- [ ] Localized validation error responses

### Documentation
- [ ] Translation guide for developers
- [ ] Key management best practices
- [ ] Adding new language support process

## Technical Requirements

### Must Use
- i18next with react-i18next
- Existing `@testwelbi/time` library for date formatting
- TypeScript for type-safe translations
- Integration with existing Material UI theme

### Key Features
- **Namespace Organization**: Logical grouping of translations
- **Lazy Loading**: Dynamic resource loading for performance
- **Type Safety**: TypeScript interfaces for translation keys
- **Fallback Strategy**: Graceful degradation for missing translations
- **Performance**: Minimal bundle size impact

## Bonus Features (+25 points each)

1. **Translation Management API** - GraphQL mutations for managing translations
2. **Missing Translation Detection** - Development tools to identify untranslated content
3. **Pluralization Engine** - Advanced plural rule handling for complex languages
4. **Translation Memory** - Reuse of similar translations across the app
5. **A/B Testing Support** - Different translation variants for experimentation

## Example Implementation Structure

### Translation Hook Usage
```typescript
// In React components
function WelcomeMessage() {
  const { t } = useTranslation(['common', 'wellness']);
  const { locale, changeLocale } = useLocale();
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <p>{t('wellness:todaySchedule', { count: events.length })}</p>
      <LocaleSelector value={locale} onChange={changeLocale} />
    </div>
  );
}
```

### GraphQL Integration
```typescript
// In GraphQL resolvers
@Query(() => [Event])
async events(@Ctx() { locale }: Context) {
  return events.map(event => ({
    ...event,
    title: translateEventTitle(event.title, locale),
    description: translateEventDescription(event.description, locale)
  }));
}
``` 