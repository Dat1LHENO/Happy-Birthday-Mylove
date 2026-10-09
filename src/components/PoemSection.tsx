import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function PoemSection(): React.JSX.Element {
  return (
    <section className="content-section poem-section-anchor">
      <ScrollReveal effect="fade-up">
        <img src="/assets/brush-ribbon.png" alt="Brush Stroke" className="brush-stroke-decor" />
      </ScrollReveal>

      {/* Polaroid photo with gentle tilt */}
      <div className="collage-grid">
        <ScrollReveal effect="slide-left" delay={100} duration={850}>
          <div className="photo-frame-polaroid sparkle-shimmer-sweep" style={{ transform: 'rotate(-1deg)' }}>
            <img src="/assets/q2.jpeg" alt="Đỗ Thị Thu Quỳnh" />
            <div className="caption">A special day, a special blessing</div>
          </div>
        </ScrollReveal>
      </div>

      {/* Birthday Love Letter Card */}
      <ScrollReveal effect="sparkle-up" delay={200} duration={900}>
        <div className="section-card poem-card">
          <div className="poem-greeting">
            Gửi đến tình yêu của anh ❤️
          </div>

          <div className="poem-text">
            <p>
              Chúc công chúa nhỏ của anh có một ngày sinh nhật thật vui vẻ và hạnh phúc nha! Cảm ơn Thượng Đế vì vào ngày này đã mang đến cho trái đất khô cằn một bông hoa tuyệt sắc, một cô gái nhỏ xinh xắn, duyên dáng với nụ cười tỏa nắng chẳng ai có thể sánh được.
            </p>
            <p>
              Cảm ơn em vì đã xuất hiện và đến bên anh. Mong rằng bước sang tuổi 22, em yêu của anh sẽ ngày càng thông minh, xinh đẹp, gặt hái được thật nhiều thành công trong công việc và có một cuộc sống hạnh phúc như em hằng ao ước nhé. Mong rằng những điều tốt đẹp nhất sẽ luôn đến với em, và anh cũng mong mình sẽ luôn được ở bên cạnh, cùng em đón nhận những niềm vui và vượt qua những lúc khó khăn.
            </p>
          </div>

          <div className="poem-closing">
            Anh yêu em rất nhiều! Chúc mừng sinh nhật Quỳnh xinh nhà anh! 💕
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
