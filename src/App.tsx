import React from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Keyboard Navigation Concept</h1>
        <p>UX Concept implementation for a keyboard navigation system</p>

        <div className="keyboard-nav-demo">
          <h2>Keyboard Navigation Demo</h2>
          <p>Use Tab, Arrow keys, and Enter to navigate</p>
          <div className="nav-grid">
            {Array.from({ length: 9 }, (_, i) => (
              <button
                key={i}
                className="nav-item"
                tabIndex={0}
                onClick={() => console.log(`Clicked item ${i + 1}`)}
              >
                Item {i + 1}
              </button>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
});

export default App;
