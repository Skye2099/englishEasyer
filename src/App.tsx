import { useState } from 'react';
import HomePage from './components/HomePage';
import WordList from './components/WordList';
import { WordProvider } from './contexts/WordContext';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryIndex: number) => {
    setSelectedCategory(categoryIndex);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <WordProvider>
      <div className="app">
        {selectedCategory === null ? (
          <HomePage onCategorySelect={handleCategorySelect} />
        ) : (
          <WordList
            categoryIndex={selectedCategory}
            onBack={handleBack}
          />
        )}
      </div>
    </WordProvider>
  );
}

export default App;
