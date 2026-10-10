import React from "react";
import { Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface BlessingFooterProps {
    onOpenHackGift?: () => void;
}

export default function BlessingFooter({ onOpenHackGift }: BlessingFooterProps): React.JSX.Element {
    return (
        <footer className="blessing-footer">
            <ScrollReveal effect="sparkle-up" duration={850}>
                {/* Secret Gift Button */}
                {onOpenHackGift && (
                    <div className="secret-gift-box-wrap">
                        <button
                            className="btn-secret-gift-box"
                            onClick={onOpenHackGift}
                            title="Món quà giành cho em nè"
                        >
                            <span className="gift-pulse-emoji">🎁</span>
                            <span className="gift-btn-text">Món quà giành cho em nè</span>
                            <Sparkles size={16} className="gift-sparkle-stars" />
                        </button>
                    </div>
                )}

                <div className="blessing-text">HAPPY BIRTHDAY MY LOVE 💕</div>
                <div className="watermark-cinelove">
                    Anh yêu của em - Phạm Tuấn Đạt
                </div>
            </ScrollReveal>
        </footer>
    );
}
