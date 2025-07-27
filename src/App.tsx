import React from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import Editor from './components/Editor';
import NavigationTypeDropDown from './components/NavigationTypeDropDown';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Keyboard Navigation Concept</h1>
        <p>
          UX Concept implementation for a keyboard based navigation system
          within sheet editing context.
        </p>

        <div className="keyboard-nav-demo">
          <h2>Keyboard Navigation Demo</h2>
          <NavigationTypeDropDown />
          <p>
            Use <kbd>Esc</kbd>, Arrow keys (<kbd>↑</kbd>, <kbd>↓</kbd>,{' '}
            <kbd>←</kbd>, <kbd>→</kbd>), and <kbd>Enter</kbd> to navigate
          </p>
          <div className="nav-grid">
            <Editor />
          </div>
        </div>
      </header>
    </div>
  );
});

export default App;
