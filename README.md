# English Easyer

A simple React application to help learn English words. Features a list of words where double-clicking on a word displays its annotation.

## Features

- Word list display
- Double-click to view word annotations
- Built with React and TypeScript using Vite

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Usage

- View the list of words on the main page.
- Double-click on any word to see its annotation in a popup.

## Technologies Used

- React
- TypeScript
- Vite
- ESLint
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
