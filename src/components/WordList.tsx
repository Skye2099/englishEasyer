import { useState, useMemo } from 'react';
import { useWords } from '../contexts/WordContext';
import AddWordModal, { type AddWordFormData } from './AddWordModal';
import ExportModal from './ExportModal';
import type { Word } from '../data/words';
import type { UserWord } from '../utils/storage';
import './WordList.css';

interface WordListProps {
  categoryIndex: number;
  onBack: () => void;
}

function WordList({ categoryIndex, onBack }: WordListProps) {
  const { categories, getCategoryWords, addWord, deleteWord, isUserWord } = useWords();
  const [selectedWord, setSelectedWord] = useState<Word | UserWord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const categoryName = categories[categoryIndex].name;
  const words = getCategoryWords(categoryIndex);

  // 按字母分组单词
  const groupedWords = useMemo(() => {
    const groups: { [key: string]: (Word | UserWord)[] } = {};

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

  const handleWordClick = (word: Word | UserWord) => {
    setSelectedWord(word);
  };

  const closeModal = () => {
    setSelectedWord(null);
  };

  const handleDeleteWord = () => {
    if (selectedWord && isUserWord(selectedWord)) {
      if (window.confirm(`确定要删除单词 "${selectedWord.word}" 吗？`)) {
        deleteWord(selectedWord.id);
        closeModal();
      }
    }
  };

  const handleAddWordSubmit = (data: AddWordFormData) => {
    addWord(categoryIndex, data);
  };

  return (
    <div className="word-list-page">
      <header className="word-list-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        <h1>{categoryName}</h1>
        <div className="header-actions">
          <button className="action-btn add-btn" onClick={() => setIsAddModalOpen(true)} title="添加单词">
            + 添加
          </button>
          <button className="action-btn export-btn" onClick={() => setIsExportModalOpen(true)} title="导出数据">
            ↓ 导出
          </button>
        </div>
      </header>

      <div className="word-list-container">
        {sortedLetters.map((letter) => (
          <div key={letter} className="letter-group">
            <h2 className="letter-heading">{letter}</h2>
            <div className="words-grid">
              {groupedWords[letter].map((word, index) => (
                <div
                  key={isUserWord(word) ? word.id : `${word.word}-${index}`}
                  className={`word-card ${isUserWord(word) ? 'user-word' : ''}`}
                  onClick={() => handleWordClick(word)}
                >
                  {word.word}
                  {isUserWord(word) && <span className="user-badge">自定义</span>}
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
            {isUserWord(selectedWord) && (
              <div className="modal-actions">
                <button className="delete-btn" onClick={handleDeleteWord}>
                  删除单词
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <AddWordModal
        isOpen={isAddModalOpen}
        categoryName={categoryName}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddWordSubmit}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        categoryIndex={categoryIndex}
        categoryName={categoryName}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}

export default WordList;
