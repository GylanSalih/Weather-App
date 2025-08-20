# Weather App React SCSS Project

Ein sauberes TypeScript + React + SCSS-Projekt mit moderner Struktur.

## 🚀 Features

-** Still in Progress

## 📦 Installation

```bash
# Alle Dependencies installieren
npm install
```

## 🛠️ Verfügbare Scripts

### Development

```bash
# Development Server starten
npm run dev

# Production Build
npm run build

# Production Build preview
npm run preview
```

### Code Quality

```bash
# Code linten
npm run lint

# Code linten und automatisch korrigieren
npm run lint:fix

# Code formatieren
npm run format

# Type-Checking ohne Kompilierung
npm run type-check
```

### Testing

```bash
# Tests ausführen
npm test

# Tests im Watch-Modus
npm run test:watch
```

## 📁 Projektstruktur

```
src/
├── main.tsx                    # React-Einstiegspunkt
├── App.tsx                     # Haupt-App-Komponente
├── App.scss                    # App-spezifische SCSS-Styles
├── index.scss                  # Globale SCSS-Styles
├── styles/                     # SCSS-Variablen und Mixins
│   └── _variables.scss        # Farben, Schatten, Breakpoints
└── components/                 # React-Komponenten
    ├── Header.tsx             # Header-Komponente
    ├── Footer.tsx             # Footer-Komponente
    └── MainContent.tsx        # Hauptinhalt-Komponente
```

## 🔧 Konfiguration

### TypeScript (`tsconfig.json`)

- Target: ES2022
- JSX: react-jsx
- Strict Mode aktiviert
- Source Maps für Debugging
- Path Aliases für bessere Imports

### Vite (`vite.config.ts`)

- React-Plugin
- SCSS-Unterstützung
- Hot Module Replacement
- Path Alias-Unterstützung
- Optimierte Builds

### SCSS (`src/styles/_variables.scss`)

- Zentrale Variablen-Datei
- Farben, Schatten, Breakpoints
- Moderne @use-Syntax
- Wiederverwendbare Werte

### ESLint (`.eslintrc.js`)

- TypeScript-spezifische Regeln
- React-spezifische Regeln
- Prettier-Integration
- Strenge Code-Qualitätsstandards

### Prettier (`.prettierrc`)

- Konsistente Code-Formatierung
- 80 Zeichen Zeilenbreite
- Single Quotes
- Semikolons aktiviert

## 💡 Verwendung

### Development starten

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:3000` verfügbar.

### SCSS verwenden

```scss
// In einer Komponente
@use 'styles/variables' as *;

.my-component {
  background-color: $primary-color;
  box-shadow: $shadow-md;

  &:hover {
    background-color: $primary-dark;
  }

  @media (max-width: $mobile) {
    padding: 1rem;
  }
}
```

### Beispiel-Komponente

```typescript
import React from 'react';
import './MyComponent.scss';

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      <p>Dein Inhalt hier...</p>
    </div>
  );
};
```

### Path Aliases

```typescript
// Statt: import { MyComponent } from '../../components/MyComponent';
import { MyComponent } from '@/components/MyComponent';
```

## 🎨 SCSS Features

- **Variablen-System** für konsistente Farben und Werte
- **Verschachtelte Selektoren** für bessere Organisation
- **Mixins** für wiederverwendbare Styles
- **Responsive Breakpoints** als Variablen
- **Moderne @use-Syntax** statt @import
- **Automatische Kompilierung** durch Vite

## 📝 Development Workflow

1. **Development Server starten**: `npm run dev`
2. **Code schreiben** in `src/components/`
3. **SCSS-Styles** in `src/styles/` und Komponenten-Dateien
4. **Code formatieren**: `npm run format`
5. **Linting**: `npm run lint`
6. **Production Build**: `npm run build`

## 🔍 Debugging

Das Projekt ist mit Source Maps konfiguriert, sodass du direkt im TypeScript- und SCSS-Code debuggen kannst.

### VS Code Debugging

- **Debug React**: F5 → "Debug TypeScript"
- **Debug Tests**: F5 → "Debug Tests"

## 📚 Nächste Schritte

- [ ] Weitere React-Komponenten hinzufügen
- [ ] SCSS-Mixins für häufige Patterns
- [ ] State Management (Redux, Zustand, etc.)
- [ ] API-Integration
- [ ] Routing (React Router)
- [ ] Testing Library für React-Komponenten
- [ ] Docker-Container erstellen
- [ ] CI/CD-Pipeline einrichten

## 🤝 Contributing

1. Code formatieren: `npm run format`
2. Linting: `npm run lint`
3. Tests: `npm test`
4. Pull Request erstellen

## 📄 Lizenz

MIT
