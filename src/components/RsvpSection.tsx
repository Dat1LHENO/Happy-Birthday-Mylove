import React, { useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { RsvpFormData } from '../types';

interface RsvpSectionProps {
  onShowToast?: (msg: string) => void;
}

export default function RsvpSection({ onShowToast }: RsvpSectionProps): React.JSX.Element {
  const [formData, setFormData] = useState<RsvpFormData>({
    name: '',
    phone: '',
    guests: '1'
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      onShowToast?.('Vui lòng nhập tên của bạn nhé!');
      return;
    }

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.75 }
    });
    onShowToast?.('Cảm ơn bạn đã xác nhận tham dự! Hẹn gặp bạn ở buổi tiệc 🎉');
  };

  return (
    <section className="content-section">
      <img src="/assets/brush-ribbon.png" alt="Brush Stroke" className="brush-stroke-decor" />

      <div className="section-card">
        <h2 className="section-header-tag">// Xác nhận tham dự //</h2>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <CheckCircle2 size={48} color="#2ec4b6" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', color: '#222', marginBottom: '8px' }}>
              Đã ghi nhận phản hồi!
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Cảm ơn <strong>{formData.name}</strong> ({formData.guests} người) đã xác nhận tham dự cùng Hải Anh nhé!
            </p>
            <button 
              className="rsvp-submit-btn" 
              style={{ marginTop: '16px', background: '#e65c7b' }}
              onClick={() => setSubmitted(false)}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="rsvp-input-group">
              <label htmlFor="rsvp-name">Tên:</label>
              <input
                id="rsvp-name"
                type="text"
                className="rsvp-input"
                placeholder="Nhập tên của bạn..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="rsvp-input-group">
              <label htmlFor="rsvp-phone">Số điện thoại :</label>
              <input
                id="rsvp-phone"
                type="tel"
                className="rsvp-input"
                placeholder="Nhập số điện thoại..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="rsvp-input-group">
              <label htmlFor="rsvp-guests">Số người tham dự:</label>
              <input
                id="rsvp-guests"
                type="number"
                min="1"
                max="10"
                className="rsvp-input"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              />
            </div>

            <button type="submit" className="rsvp-submit-btn">
              Gửi
            </button>
          </form>
        )}

        {/* Quick Call Direct Contact Buttons */}
        <div className="quick-call-row">
          <a href="tel:0987654321" className="call-pill-btn">
            <Phone size={14} />
            <span>Gọi cho tôi</span>
          </a>
          <a href="tel:0912345678" className="call-pill-btn">
            <Phone size={14} />
            <span>Gọi ba mẹ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
