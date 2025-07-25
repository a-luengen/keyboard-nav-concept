# Keyboard Navigation Concept

UX Concept implementation for a keyboard navigation system that can be used within a Sheet Editing context.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **MobX** for state management with observable stores
- **ESLint** and **Prettier** for code formatting and linting
- **Modern UI** with responsive design and keyboard navigation
- **GitHub Pages** deployment with CI/CD pipeline
- **Accessibility** focused with proper focus management

## 🛠️ Tech Stack

- React 18.2.0
- TypeScript 4.7.4
- MobX 6.13.7
- ESLint with TypeScript support
- Prettier for code formatting
- GitHub Actions for CI/CD

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/keyboard-nav-concept.git
cd keyboard-nav-concept
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## 🎯 Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the app for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 VS Code Setup

This project includes VS Code configuration for optimal development experience:

### Required Extensions

When you open this project in VS Code, you'll be prompted to install recommended extensions:

- **Prettier - Code formatter** - Automatic code formatting
- **ESLint** - JavaScript/TypeScript linting
- **TypeScript and JavaScript Language Features** - Enhanced TypeScript support

### Auto-Formatting

The project is configured to automatically format code on save:

- **Format on Save**: Enabled for all supported file types
- **Default Formatter**: Prettier for consistent code style
- **ESLint Auto-fix**: Automatically fixes ESLint issues on save

### Debugging

Launch configurations are included for debugging:

- **Launch Chrome**: Debug in Chrome browser
- **Launch Edge**: Debug in Edge browser

To start debugging:

1. Start the development server: `npm start`
2. Press `F5` or go to Run and Debug panel
3. Select "Launch Chrome" or "Launch Edge"

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main App component
├── App.css              # App styles
├── index.tsx            # App entry point
├── index.css            # Global styles
├── reportWebVitals.ts   # Performance monitoring
└── stores/              # MobX stores
    ├── RootStore.ts     # Root store configuration
    └── CounterStore.ts  # Counter store example
```

## 🎨 State Management

The project uses MobX for state management with a clean store structure:

- **RootStore**: Central store that manages all other stores
- **CounterStore**: Example store demonstrating MobX patterns

### Example Store Usage

```typescript
import { observer } from 'mobx-react-lite';
import { useRootStore } from './stores/RootStore';

const MyComponent = observer(() => {
  const { counterStore } = useRootStore();

  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <button onClick={() => counterStore.increment()}>
        Increment
      </button>
    </div>
  );
});
```

## ⌨️ Keyboard Navigation

The app includes a demo of keyboard navigation patterns:

- **Tab Navigation**: Standard tab order for accessibility
- **Focus Management**: Visual focus indicators
- **Grid Navigation**: 3x3 grid demonstrating spatial navigation

## 🚀 Deployment

The project is configured for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions will automatically:
   - Run linting and tests
   - Build the production version
   - Deploy to GitHub Pages

The app will be available at: `https://yourusername.github.io/keyboard-nav-concept`

## 🔧 Configuration Files

- `.eslintrc.js` - ESLint configuration with TypeScript and Prettier
- `.prettierrc` - Prettier formatting rules
- `tsconfig.json` - TypeScript compiler options
- `.github/workflows/deploy.yml` - GitHub Actions CI/CD pipeline

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run linting: `npm run lint`
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

If you have any questions or need help, please open an issue on GitHub.
