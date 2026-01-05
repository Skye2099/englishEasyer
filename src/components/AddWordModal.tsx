import { useState } from 'react';
import './AddWordModal.css';

export interface AddWordFormData {
  word: string;
  annotation: string;
  pronunciation?: string;
}

interface AddWordModalProps {
  isOpen: boolean;
  categoryName: string;
  onClose: () => void;
  onSubmit: (data: AddWordFormData) => void;
}

function AddWordModal({ isOpen, categoryName, onClose, onSubmit }: AddWordModalProps) {
  const [formData, setFormData] = useState<AddWordFormData>({
    word: '',
    annotation: '',
    pronunciation: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.word.trim() && formData.annotation.trim()) {
      onSubmit({
        word: formData.word.trim(),
        annotation: formData.annotation.trim(),
        pronunciation: formData.pronunciation?.trim() || undefined,
      });
      // 重置表单
      setFormData({ word: '', annotation: '', pronunciation: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ word: '', annotation: '', pronunciation: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content add-word-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <h2>添加单词到「{categoryName}」</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="word">单词 *</label>
            <input
              type="text"
              id="word"
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value })}
              placeholder="请输入单词"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="annotation">注解 *</label>
            <textarea
              id="annotation"
              value={formData.annotation}
              onChange={(e) => setFormData({ ...formData, annotation: e.target.value })}
              placeholder="请输入注解（中文意思 - 英文解释）"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pronunciation">音标（可选）</label>
            <input
              type="text"
              id="pronunciation"
              value={formData.pronunciation}
              onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
              placeholder="例如: /ˈæpl/"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              取消
            </button>
            <button type="submit" className="submit-btn">
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWordModal;
