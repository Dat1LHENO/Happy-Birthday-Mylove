import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function BlessingFooter(): React.JSX.Element {
    return (
        <footer className="blessing-footer">
            <ScrollReveal effect="sparkle-up" duration={850}>
                <div className="blessing-text">HAPPY BIRTHDAY MY LOVE 💕</div>
                <div className="watermark-cinelove">
                    Anh yêu của em - Phạm Tuấn Đạt
                </div>
            </ScrollReveal>
        </footer>
    );
}
