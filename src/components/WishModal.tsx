import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import type { SubmitWishPayload } from '../types';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWish: (payload: SubmitWishPayload) => void;
}

export default function WishModal({ isOpen, onClose, onSubmitWish }: WishModalProps): React.JSX.Element | null {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onSubmitWish({ author: name.trim(), message: message.trim() });
    setName('');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close wish modal">
          <X size={20} />
        </button>

        <div className="modal-header-icon">
          <Heart size={36} fill="#ff4d6d" color="#ff4d6d" />
        </div>

        <h3 className="modal-title">Lời chúc</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <textarea
            className="modal-input modal-textarea"
            placeholder="Lời chúc của bạn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
          />

          <button type="submit" className="modal-submit-btn">
            Gửi Lời Chúc
          </button>
        </form>
      </div>
    </div>
  );
}
