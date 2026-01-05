import { useState } from 'react';
import { getUserWordsByCategory } from '../utils/storage';
import type { Word } from '../data/words';
import './ExportModal.css';

interface ExportModalProps {
  isOpen: boolean;
  categoryIndex: number;
  categoryName: string;
  onClose: () => void;
}

function ExportModal({ isOpen, categoryIndex, categoryName, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const userWords = getUserWordsByCategory(categoryIndex);

  // 转换为标准 Word 格式（去掉 id, categoryIndex, createdAt）
  const exportWords: Word[] = userWords.map((word) => ({
    word: word.word,
    annotation: word.annotation,
    ...(word.pronunciation && { pronunciation: word.pronunciation }),
  }));

  // 生成可复制的代码
  const generateCode = () => {
    if (exportWords.length === 0) {
      return '// 当前分类没有自定义单词';
    }

    const wordsCode = exportWords
      .map((word) => {
        const pronunciationPart = word.pronunciation
          ? `, pronunciation: '${word.pronunciation}'`
          : '';
        return `  { word: '${word.word}', annotation: '${word.annotation}'${pronunciationPart} }`;
      })
      .join(',\n');

    return `// 复制以下代码到 src/data/words.ts 对应的分类数组中\n\n${wordsCode}`;
  };

  const codeText = generateCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请手动选择文本复制');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>导出「{categoryName}」的自定义单词</h2>

        {exportWords.length === 0 ? (
          <div className="empty-state">
            <p>当前分类还没有自定义单词</p>
            <p className="hint">添加一些单词后再来导出吧 😊</p>
          </div>
        ) : (
          <>
            <div className="export-info">
              <p>共有 <strong>{exportWords.length}</strong> 个自定义单词</p>
              <p className="hint">复制下方代码粘贴到 <code>src/data/words.ts</code> 对应的数组中</p>
            </div>

            <div className="code-container">
              <pre className="code-block">{codeText}</pre>
            </div>

            <div className="export-actions">
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? '✓ 已复制' : '复制代码'}
              </button>
            </div>

            <div className="instructions">
              <h3>使用说明：</h3>
              <ol>
                <li>点击"复制代码"按钮</li>
                <li>打开 <code>src/data/words.ts</code> 文件</li>
                <li>找到对应的分类数组（如 <code>basicWords</code>、<code>phrases</code> 等）</li>
                <li>粘贴代码到数组末尾（注意添加逗号分隔）</li>
                <li>保存文件，单词将成为默认数据</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExportModal;
