import React, { useEffect, useState } from "react";
import { Sparkles, ChevronDown, Pause } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface HeroSectionProps {
    onStartAutoScroll?: () => void;
    isAutoScrolling?: boolean;
}

export default function HeroSection({
    onStartAutoScroll,
    isAutoScrolling = false,
}: HeroSectionProps): React.JSX.Element {
    const [hasScrolled, setHasScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollClick = () => {
        if (onStartAutoScroll) {
            onStartAutoScroll();
        } else {
            const poemEl = document.querySelector(".poem-section-anchor");
            if (poemEl) {
                poemEl.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollBy({ top: 400, behavior: "smooth" });
            }
        }
    };

    return (
        <section className="hero-section">
            <img
                src="/assets/top-ribbon.png"
                alt="Decoration"
                className="top-ribbon-decor"
            />

            {/* Arched Photo Frame with shimmer sheen sweep */}
            <ScrollReveal effect="sparkle-up" duration={900}>
                <div className="hero-arch-frame sparkle-shimmer-sweep">
                    <img src="/assets/q7.jpeg" alt="Đỗ Thị Thu Quỳnh" />
                </div>
            </ScrollReveal>

            {/* Hero Card Details */}
            <ScrollReveal effect="fade-up" delay={200} duration={850}>
                <div className="hero-card">
                    <h1 className="title-birthday">Ngày Tuyệt Vời Nhất</h1>

                    <p className="invitation-intro">
                        Mừng sinh nhật thứ 21 công chúa bé bỏng của anh 💝
                    </p>

                    <div className="event-highlight-date">
                        Ngày 09 tháng 10 năm 2026
                    </div>

                    <div className="honoree-calligraphy">Đỗ Thị Thu Quỳnh</div>
                </div>
            </ScrollReveal>

            {/* Floating Scroll-Down & Auto-Scroll Trigger */}
            <div
                className={`hero-scroll-indicator ${hasScrolled && !isAutoScrolling ? "faded" : ""}`}
                onClick={handleScrollClick}
                title={
                    isAutoScrolling
                        ? "Tạm dừng cuộn"
                        : "Bắt đầu tự động cuộn xuống"
                }
            >
                <div
                    className={`scroll-pill ${isAutoScrolling ? "scrolling-active" : ""}`}
                >
                    {isAutoScrolling ? (
                        <>
                            <Pause size={13} className="pause-icon" />
                            <span>Đang tự động cuộn...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={14} className="sparkle-spin" />
                            <span>Cuộn xuống cùng anh</span>
                            <ChevronDown size={14} className="chevron-bounce" />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
