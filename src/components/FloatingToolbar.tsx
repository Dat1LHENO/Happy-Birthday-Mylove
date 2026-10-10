import React from "react";
import { Heart, Gift, ThumbsUp, Play, Pause } from "lucide-react";

interface FloatingToolbarProps {
    onOpenWishModal?: () => void;
    onOpenGiftModal: () => void;
    onBurstHearts: () => void;
    onLike: () => void;
    likeCount: number;
    isAutoScrolling?: boolean;
    onToggleAutoScroll?: () => void;
}

export default function FloatingToolbar({
    onOpenGiftModal,
    onBurstHearts,
    onLike,
    likeCount,
    isAutoScrolling = false,
    onToggleAutoScroll,
}: FloatingToolbarProps) {
    return (
        <div className="floating-bottom-toolbar">
            <div className="toolbar-inner">
                {/* Auto Scroll Toggle Button */}
                {onToggleAutoScroll && (
                    <button
                        className={`btn-toolbar-action btn-auto-scroll ${isAutoScrolling ? "active" : ""}`}
                        onClick={onToggleAutoScroll}
                        title={
                            isAutoScrolling
                                ? "Dừng tự động cuộn"
                                : "Bật tự động cuộn đến cuối"
                        }
                    >
                        {isAutoScrolling ? (
                            <>
                                <Pause size={13} color="#ea536e" />
                                <span>Dừng</span>
                            </>
                        ) : (
                            <>
                                <Play
                                    size={13}
                                    fill="#ea536e"
                                    color="#ea536e"
                                />
                                <span>Tự cuộn</span>
                            </>
                        )}
                    </button>
                )}

                {/* Shoot Hearts Button */}
                <button
                    className="btn-toolbar-action btn-heart-burst"
                    onClick={onBurstHearts}
                    title="Bắn tim"
                >
                    <Heart size={14} fill="#ea536e" color="#ea536e" />
                    <span>Bắn tim</span>
                </button>

                <div className="toolbar-inner__right">
                    {/* Gift Button */}
                    <button
                        className="btn-gift-modal"
                        onClick={onOpenGiftModal}
                        title="Tặng quà"
                    >
                        <Gift size={18} />
                    </button>

                    {/* Like Counter Button */}
                    <button
                        className="btn-toolbar-action btn-like-counter"
                        onClick={onLike}
                        title="Thích"
                    >
                        <ThumbsUp size={15} />
                        <span className="like-badge-num">{likeCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
