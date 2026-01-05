import { useWords } from '../contexts/WordContext';
import './HomePage.css';

interface HomePageProps {
  onCategorySelect: (categoryIndex: number) => void;
}

function HomePage({ onCategorySelect }: HomePageProps) {
  const { categories } = useWords();

  return (
    <div className="home-page">
      <h1>English Easyer</h1>
      <p className="subtitle">选择一个分类开始学习</p>

      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-btn"
            onClick={() => onCategorySelect(index)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
