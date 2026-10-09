import React, { useState } from 'react';
import { X, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Gift, SendGiftPayload } from '../types';

const GIFTS: Gift[] = [
  { id: 'biubiu', name: 'Bắn tim', price: 520, emoji: '🐾' },
  { id: 'sakura', name: 'Hoa anh đào', price: 1180, emoji: '🌸' },
  { id: 'lock', name: 'Khoá tình yêu', price: 1314, emoji: '🔐' },
  { id: 'cake', name: 'Bánh ngọt', price: 1580, emoji: '🎂' },
  { id: 'heart', name: 'Trái tim', price: 1580, emoji: '🎈' },
  { id: 'popper', name: 'Pháo mừng', price: 1980, emoji: '🎉' },
  { id: 'fireworks', name: 'Pháo hoa mừng', price: 1980, emoji: '🎆' },
  { id: 'bear', name: 'Hoa gấu bông', price: 2020, emoji: '🧸' },
];

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendGift: (payload: SendGiftPayload) => void;
}

export default function GiftModal({ isOpen, onClose, onSendGift }: GiftModalProps): React.JSX.Element | null {
  const [selectedGift, setSelectedGift] = useState<Gift>(GIFTS[0]);
  const [senderName, setSenderName] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!senderName.trim()) return;

    onSendGift({
      sender: senderName.trim(),
      gift: selectedGift
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSenderName('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close gift modal">
          <X size={20} />
        </button>

        <h3 className="modal-title" style={{ marginBottom: '8px' }}>
          Tặng Quà
        </h3>
        <div style={{ width: '40px', height: '3px', background: '#f28e9b', margin: '0 auto 16px', borderRadius: '2px' }} />

        {/* Gift Grid */}
        <div className="gifts-grid">
          {GIFTS.map((gift) => (
            <div
              key={gift.id}
              className={`gift-item ${selectedGift.id === gift.id ? 'selected' : ''}`}
              onClick={() => setSelectedGift(gift)}
            >
              <div className="gift-emoji-icon">{gift.emoji}</div>
              <div className="gift-name">{gift.name}</div>
              <div className="gift-price">
                <span>{gift.price}</span>
                <Coins size={11} color="#f59e0b" />
              </div>
            </div>
          ))}
        </div>

        <p className="gift-quote-note">
          Hãy để những món quà xinh đẹp này mang niềm vui bất ngờ đến với Người nhận nha
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Tên của bạn"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
            autoFocus
          />

          <button type="submit" className="modal-submit-btn">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}
