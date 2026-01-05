import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { categories, type Word, type WordCategory } from '../data/words';
import {
  addUserWord,
  deleteUserWord,
  updateUserWord,
  getUserWordsByCategory,
  mergeWords,
  type UserWord,
} from '../utils/storage';

interface WordContextType {
  categories: WordCategory[];
  getCategoryWords: (categoryIndex: number) => (Word | UserWord)[];
  addWord: (categoryIndex: number, word: Omit<Word, 'id' | 'createdAt'>) => UserWord;
  deleteWord: (id: string) => boolean;
  updateWord: (id: string, updates: Partial<Omit<UserWord, 'id' | 'createdAt'>>) => UserWord | null;
  isUserWord: (word: Word | UserWord) => word is UserWord;
}

const WordContext = createContext<WordContextType | undefined>(undefined);

interface WordProviderProps {
  children: ReactNode;
}

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
  const [userWordsMap, setUserWordsMap] = useState<Map<number, UserWord[]>>(new Map());

  // 初始化时加载所有用户单词
  useEffect(() => {
    const map = new Map<number, UserWord[]>();
    categories.forEach((_, index) => {
      map.set(index, getUserWordsByCategory(index));
    });
    setUserWordsMap(map);
  }, []);

  // 获取指定分类的所有单词（默认 + 用户自定义）
  const getCategoryWords = (categoryIndex: number): (Word | UserWord)[] => {
    const defaultWords = categories[categoryIndex].words;
    const userWords = userWordsMap.get(categoryIndex) || [];
    return mergeWords(defaultWords, userWords);
  };

  // 添加单词
  const addWord = (categoryIndex: number, word: Omit<Word, 'id' | 'createdAt'>): UserWord => {
    const newWord = addUserWord({ ...word, categoryIndex });
    setUserWordsMap((prev) => {
      const newMap = new Map(prev);
      const categoryWords = newMap.get(categoryIndex) || [];
      newMap.set(categoryIndex, [...categoryWords, newWord]);
      return newMap;
    });
    return newWord;
  };

  // 删除单词
  const deleteWord = (id: string): boolean => {
    const success = deleteUserWord(id);
    if (success) {
      setUserWordsMap((prev) => {
        const newMap = new Map(prev);
        newMap.forEach((words, categoryIndex) => {
          newMap.set(
            categoryIndex,
            words.filter((w) => w.id !== id)
          );
        });
        return newMap;
      });
    }
    return success;
  };

  // 更新单词
  const updateWord = (id: string, updates: Partial<Omit<UserWord, 'id' | 'createdAt'>>): UserWord | null => {
    const updated = updateUserWord(id, updates);
    if (updated) {
      setUserWordsMap((prev) => {
        const newMap = new Map(prev);
        const categoryWords = newMap.get(updated.categoryIndex) || [];
        const index = categoryWords.findIndex((w) => w.id === id);
        if (index !== -1) {
          categoryWords[index] = updated;
          newMap.set(updated.categoryIndex, [...categoryWords]);
        }
        return newMap;
      });
    }
    return updated;
  };

  // 判断是否为用户自定义单词
  const isUserWord = (word: Word | UserWord): word is UserWord => {
    return 'id' in word;
  };

  const value: WordContextType = {
    categories,
    getCategoryWords,
    addWord,
    deleteWord,
    updateWord,
    isUserWord,
  };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};

export const useWords = (): WordContextType => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error('useWords must be used within a WordProvider');
  }
  return context;
};
