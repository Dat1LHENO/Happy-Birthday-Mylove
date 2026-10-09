import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function DesktopQrWidget(): React.JSX.Element | null {
  const [closed, setClosed] = useState<boolean>(false);

  if (closed) return null;

  // Generate QR code pointing to current URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}&color=000000`;

  return (
    <div className="desktop-qr-widget">
      <button 
        className="qr-close-btn" 
        onClick={() => setClosed(true)}
        title="Đóng QR"
        aria-label="Close QR Widget"
      >
        <X size={14} />
      </button>

      <img src={qrUrl} alt="QR Code" className="qr-img" />
      <div className="qr-caption">
        Quét mã QR để xem trên điện thoại
      </div>
    </div>
  );
}
