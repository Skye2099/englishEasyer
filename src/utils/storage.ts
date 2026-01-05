import type { Word, WordCategory } from '../data/words';

const STORAGE_KEY = 'englishEasyer_userWords';

export interface UserWord extends Word {
  id: string;
  categoryIndex: number;
  createdAt: string;
}

export interface StorageData {
  userWords: UserWord[];
}

// 获取存储的数据
export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
  return { userWords: [] };
};

// 保存数据
export const saveStorageData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
};

// 添加用户自定义单词
export const addUserWord = (word: Omit<UserWord, 'id' | 'createdAt'>): UserWord => {
  const data = getStorageData();
  const newWord: UserWord = {
    ...word,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  data.userWords.push(newWord);
  saveStorageData(data);
  return newWord;
};

// 删除用户自定义单词
export const deleteUserWord = (id: string): boolean => {
  const data = getStorageData();
  const initialLength = data.userWords.length;
  data.userWords = data.userWords.filter((word) => word.id !== id);
  const deleted = data.userWords.length !== initialLength;
  if (deleted) {
    saveStorageData(data);
  }
  return deleted;
};

// 更新用户自定义单词
export const updateUserWord = (id: string, updates: Partial<Omit<UserWord, 'id' | 'createdAt'>>): UserWord | null => {
  const data = getStorageData();
  const wordIndex = data.userWords.findIndex((word) => word.id === id);
  if (wordIndex === -1) return null;

  data.userWords[wordIndex] = {
    ...data.userWords[wordIndex],
    ...updates,
  };
  saveStorageData(data);
  return data.userWords[wordIndex];
};

// 获取指定分类的用户自定义单词
export const getUserWordsByCategory = (categoryIndex: number): UserWord[] => {
  const data = getStorageData();
  return data.userWords.filter((word) => word.categoryIndex === categoryIndex);
};

// 合并默认单词和用户自定义单词
export const mergeWords = (defaultWords: Word[], userWords: UserWord[]): (Word | UserWord)[] => {
  return [...defaultWords, ...userWords];
};
