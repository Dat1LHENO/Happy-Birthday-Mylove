import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function LocationSection(): React.JSX.Element {
  const address = "52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội")}`;

  return (
    <section className="content-section">
      <img src="/assets/brush-ribbon.png" alt="Brush Stroke" className="brush-stroke-decor" />

      <div className="section-card">
        <h2 className="section-header-tag">//Địa điểm buổi tiệc//</h2>

        {/* Embedded Interactive Map */}
        <div className="map-container">
          <iframe
            title="Party Location Map"
            src="https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m,%20M%E1%BB%85%20Tr%C3%AC,%20Nam%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Location Text */}
        <div className="location-address">
          {address}
        </div>

        {/* Button to open Maps */}
        <a 
          href={mapsUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="map-directions-btn"
        >
          <MapPin size={16} />
          <span>Open in Maps</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
