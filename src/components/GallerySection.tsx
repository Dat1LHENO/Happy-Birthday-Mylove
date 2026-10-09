import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function GallerySection(): React.JSX.Element {
  return (
    <section className="content-section">
      <ScrollReveal effect="zoom-in" duration={700}>
        <div className="sweet-baby-banner">✨ SWEET BABY ✨</div>
      </ScrollReveal>

      {/* Dual Photo Showcase 1 */}
      <div className="collage-grid">
        <div className="photo-row-dual">
          <ScrollReveal effect="slide-left" delay={80} duration={850}>
            <div className="photo-frame-polaroid sparkle-shimmer-sweep" style={{ padding: '8px 8px 16px' }}>
              <img src="/assets/q1.jpeg" alt="Aquarium moments" style={{ height: '210px', objectFit: 'cover' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal effect="slide-right" delay={180} duration={850}>
            <div className="photo-arch-medium sparkle-shimmer-sweep">
              <img src="/assets/q6.jpeg" alt="Pink Bougainvillea smile" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal effect="fade-up" duration={700}>
        <img src="/assets/brush-ribbon.png" alt="Brush Stroke" className="brush-stroke-decor" />
      </ScrollReveal>

      <ScrollReveal effect="zoom-in" duration={700}>
        <div className="sweet-baby-banner">💖 HAPPY BIRTHDAY 💖</div>
      </ScrollReveal>

      {/* Big Feature Photo: Tháp Bà Ponagar with shimmer sheen sweep */}
      <ScrollReveal effect="sparkle-up" delay={120} duration={900}>
        <div className="big-feature-photo sparkle-shimmer-sweep">
          <img src="/assets/q3.jpeg" alt="Tháp Bà Ponagar Moment" />
        </div>
      </ScrollReveal>

      {/* Dual Photo Showcase 2 */}
      <div className="collage-grid">
        <div className="photo-row-dual">
          <ScrollReveal effect="slide-left" delay={80} duration={850}>
            <div className="photo-arch-medium sparkle-shimmer-sweep">
              <img src="/assets/q5.jpeg" alt="Mirror selfie outfit" />
            </div>
          </ScrollReveal>

          <ScrollReveal effect="slide-right" delay={180} duration={850}>
            <div className="photo-frame-polaroid sparkle-shimmer-sweep" style={{ padding: '8px 8px 16px' }}>
              <img src="/assets/q8.jpeg" alt="Chic style with sunglasses" style={{ height: '210px', objectFit: 'cover' }} />
            </div>
          </ScrollReveal>
        </div>

        {/* Polaroid: Sweet Portrait */}
        <ScrollReveal effect="fade-up" delay={150} duration={850}>
          <div className="photo-frame-polaroid sparkle-shimmer-sweep">
            <img src="/assets/q4.jpeg" alt="Birthday Portrait" />
            <div className="caption">Dancing with the stars ✨</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
