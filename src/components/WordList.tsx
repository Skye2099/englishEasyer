import { useState, useMemo } from 'react';
import type { Word } from '../data/words';
import './WordList.css';

interface WordListProps {
  categoryName: string;
  words: Word[];
  onBack: () => void;
}

function WordList({ categoryName, words, onBack }: WordListProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  // 按字母分组单词
  const groupedWords = useMemo(() => {
    const groups: { [key: string]: Word[] } = {};

    words.forEach((word) => {
      const firstLetter = word.word[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(word);
    });

    // 对每个分组内的单词进行排序
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.word.localeCompare(b.word));
    });

    return groups;
  }, [words]);

  // 获取排序后的字母列表
  const sortedLetters = Object.keys(groupedWords).sort();

  const handleWordClick = (word: Word) => {
    setSelectedWord(word);
  };

  const closeModal = () => {
    setSelectedWord(null);
  };

  return (
    <div className="word-list-page">
      <header className="word-list-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <h1>{categoryName}</h1>
        <div className="placeholder"></div>
      </header>

      <div className="word-list-container">
        {sortedLetters.map((letter) => (
          <div key={letter} className="letter-group">
            <h2 className="letter-heading">{letter}</h2>
            <div className="words-grid">
              {groupedWords[letter].map((word, index) => (
                <div
                  key={index}
                  className="word-card"
                  onClick={() => handleWordClick(word)}
                >
                  {word.word}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedWord && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-word">{selectedWord.word}</h2>
            {selectedWord.pronunciation && (
              <p className="modal-pronunciation">{selectedWord.pronunciation}</p>
            )}
            <p className="modal-annotation">{selectedWord.annotation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WordList;
