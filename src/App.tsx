import { useState } from 'react';
import HomePage from './components/HomePage';
import WordList from './components/WordList';
import { categories } from './data/words';
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
    <div className="app">
      {selectedCategory === null ? (
        <HomePage onCategorySelect={handleCategorySelect} />
      ) : (
        <WordList
          categoryName={categories[selectedCategory].name}
          words={categories[selectedCategory].words}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
