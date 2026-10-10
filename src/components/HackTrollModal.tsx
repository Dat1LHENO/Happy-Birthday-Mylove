import React, { useState, useEffect, useRef } from "react";
import {
    Terminal,
    ShieldAlert,
    Lock,
    Unlock,
    Heart,
    Sparkles,
    CheckCircle2,
    Timer,
    Flame,
    PlusCircle,
    Volume2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface HackTrollModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLockStateChange?: (isLocked: boolean) => void;
    onUnlockedSuccess?: () => void;
}

const INITIAL_COUNTDOWN_SECONDS = 60;

function HackTrollContent({
    onClose,
    onLockStateChange,
    onUnlockedSuccess,
}: Omit<HackTrollModalProps, "isOpen">): React.JSX.Element {
    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
    const [remainingMs, setRemainingMs] = useState<number>(
        INITIAL_COUNTDOWN_SECONDS * 1000,
    );
    const [isPenaltyShown, setIsPenaltyShown] = useState<boolean>(false);
    const [bonusTimeToast, setBonusTimeToast] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const clockAudioRef = useRef<HTMLAudioElement | null>(null);
    const endTimeRef = useRef<number>(0);

    // Initialize audio playback and notify parent on mount
    useEffect(() => {
        // Start countdown target
        endTimeRef.current = Date.now() + INITIAL_COUNTDOWN_SECONDS * 1000;

        // Notify parent that hacker lock mode is active (pauses background music)
        onLockStateChange?.(true);

        // Start ticking clock music (clock.mp3)
        const clockAudio = clockAudioRef.current;
        if (clockAudio) {
            clockAudio.currentTime = 0;
            clockAudio.volume = 0.85;
            clockAudio.play().catch((err: unknown) => {
                console.warn("clock.mp3 autoplay prevented:", err);
            });
        }

        // Focus input after slight animation delay
        const focusTimer = setTimeout(() => {
            inputRef.current?.focus();
        }, 300);

        return () => {
            clearTimeout(focusTimer);
            if (clockAudio) {
                clockAudio.pause();
                clockAudio.currentTime = 0;
            }
            onLockStateChange?.(false);
        };
    }, [onLockStateChange]);

    // Timer interval loop while locked
    useEffect(() => {
        if (isUnlocked) return;

        const timer = setInterval(() => {
            const now = Date.now();
            const diff = endTimeRef.current - now;

            if (diff <= 0) {
                // Time ran out! Trigger penalty notice and auto-extend +45 seconds
                setIsPenaltyShown(true);
                endTimeRef.current = Date.now() + 45 * 1000;
                setRemainingMs(45 * 1000);
            } else {
                setRemainingMs(diff);
            }
        }, 80);

        return () => clearInterval(timer);
    }, [isUnlocked]);

    // Stop clock.mp3 when unlocked
    useEffect(() => {
        if (isUnlocked && clockAudioRef.current) {
            clockAudioRef.current.pause();
            clockAudioRef.current.currentTime = 0;
        }
    }, [isUnlocked]);

    const handleCloseModal = () => {
        if (clockAudioRef.current) {
            clockAudioRef.current.pause();
            clockAudioRef.current.currentTime = 0;
        }
        onLockStateChange?.(false);
        onClose();
    };

    const handleRequestBonusTime = () => {
        endTimeRef.current += 30 * 1000;
        setRemainingMs((prev) => prev + 30 * 1000);
        setBonusTimeToast(
            "Đã nhận hối lộ! Hacker Đạt tặng thêm +30s cho công chúa đó nha 💕",
        );
        setTimeout(() => setBonusTimeToast(null), 3200);
    };

    const normalizeString = (str: string) => {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/\s+/g, " ")
            .trim();
    };

    const handleUnlockSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const raw = inputValue.trim().toLowerCase();
        const normalized = normalizeString(inputValue);

        // Check if user entered "Quỳnh yêu Đạt nhất" (with or without accents, or flexible variants)
        const isMatch =
            raw.includes("quỳnh yêu đạt nhất") ||
            normalized.includes("quynh yeu dat nhat") ||
            (normalized.includes("quynh") &&
                normalized.includes("yeu") &&
                normalized.includes("dat") &&
                normalized.includes("nhat"));

        if (isMatch) {
            setErrorMessage(null);
            setIsUnlocked(true);

            // Stop clock ticking sound immediately
            if (clockAudioRef.current) {
                clockAudioRef.current.pause();
                clockAudioRef.current.currentTime = 0;
            }

            // Notify parent that lock is deactivated & trigger celebration
            onLockStateChange?.(false);
            onUnlockedSuccess?.();

            // Trigger joyful confetti burst
            confetti({
                particleCount: 130,
                spread: 85,
                origin: { y: 0.5 },
                colors: ["#ff4d6d", "#ff758f", "#ffd166", "#06d6a0", "#118ab2"],
            });
            setTimeout(() => {
                confetti({
                    particleCount: 90,
                    angle: 60,
                    spread: 60,
                    origin: { x: 0 },
                });
                confetti({
                    particleCount: 90,
                    angle: 120,
                    spread: 60,
                    origin: { x: 1 },
                });
            }, 300);
        } else {
            setIsShaking(true);
            setErrorMessage(
                '❌ Mật mã không chính xác! Hãy nhập đúng: "Quỳnh yêu Đạt nhất" nhé cô nương 😜',
            );
            setTimeout(() => {
                setIsShaking(false);
            }, 500);
        }
    };

    // Calculate formatted time & urgency levels
    const totalSecs = Math.max(0, Math.floor(remainingMs / 1000));
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    const centis = Math.floor((remainingMs % 1000) / 10);
    const formattedTimer = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;

    const progressPercent = Math.min(
        100,
        Math.max(0, (remainingMs / (INITIAL_COUNTDOWN_SECONDS * 1000)) * 100),
    );
    const isCritical = totalSecs <= 12;
    const isWarning = totalSecs <= 25 && !isCritical;

    return (
        <div className="hack-modal-overlay">
            {/* Background Clock Audio Ticking Sound */}
            <audio
                ref={clockAudioRef}
                src="/assets/clock.mp3"
                loop
                preload="auto"
            />

            {/* Retro Scanlines Overlay */}
            <div className="hack-scanlines" />

            <div
                className={`hack-modal-card ${isUnlocked ? "unlocked-love-mode" : ""} ${isShaking ? "shake-anim" : ""} ${isCritical && !isUnlocked ? "critical-alarm-pulse" : ""}`}
            >
                {!isUnlocked ? (
                    // HACKER TERMINAL LOCK SCREEN
                    <div className="hack-terminal-body">
                        {/* Header Warning Bar */}
                        <div className="hack-warning-badge">
                            <span className="blinking-dot" />
                            <ShieldAlert size={18} className="warn-icon" />
                            <span>CRITICAL SECURITY WARNING</span>
                        </div>

                        {/* Glitch / Alarm Header */}
                        <h2 className="hack-alarm-title">
                            ⚠️ HỆ THỐNG ĐÃ BỊ XÂM NHẬP! ⚠️
                        </h2>

                        {/* DRAMATIC COUNTDOWN TIMER BOX */}
                        <div
                            className={`hack-timer-card ${isCritical ? "critical" : isWarning ? "warning" : "normal"}`}
                        >
                            <div className="hack-timer-top">
                                <div className="timer-badge-tag">
                                    <Timer
                                        size={14}
                                        className="timer-spin-icon"
                                    />
                                    <span>THỜI GIAN CÒN LẠI CỦA BẠN</span>
                                </div>
                                <div className="sound-active-pill">
                                    <Volume2
                                        size={12}
                                        className="sound-pulse-icon"
                                    />
                                </div>
                            </div>

                            {/* Digits Display */}
                            <div className="hack-timer-digits-row">
                                <span className="timer-big-digits">
                                    {formattedTimer}
                                </span>
                            </div>

                            {/* Neon Progress Bar */}
                            <div className="hack-timer-track">
                                <div
                                    className={`hack-timer-bar ${isCritical ? "critical-bar" : isWarning ? "warning-bar" : "normal-bar"}`}
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            {/* Urgent status message */}
                            <p className="hack-timer-status-msg">
                                {isCritical
                                    ? "🚨 NGUY HIỂM! Thiết bị sắp bị khóa vĩnh viễn trong tích tắc!"
                                    : isWarning
                                      ? "⚠️ CẢNH BÁO: Thời gian đang cạn dần! Giải mã ngay!"
                                      : "⏳ Hệ thống đang đếm ngược... Mau nhập mật mã để vô hiệu hóa trojan!"}
                            </p>
                        </div>

                        {/* Penalty Notice Banner (if timer reached 0) */}
                        {isPenaltyShown && (
                            <div className="hack-penalty-box">
                                <div className="penalty-header">
                                    <Flame size={16} className="flame-icon" />
                                    <span>
                                        🚨 HẾT GIỜ! HÌNH PHẠT CẤP ĐỘ 1 KÍCH
                                        HOẠT:
                                    </span>
                                </div>
                                <p className="penalty-body">
                                    Quỳnh bị phạt phải thơm má Đạt 10 cái 😘
                                    <br />
                                    <em>
                                        (Hacker Đạt đã nới lỏng án phạt, tự động
                                        gia hạn thêm thời gian cho em giải mã
                                        nè...)
                                    </em>
                                </p>
                            </div>
                        )}

                        {/* Bonus Time Toast Message */}
                        {bonusTimeToast && (
                            <div className="hack-bonus-toast">
                                <span>{bonusTimeToast}</span>
                            </div>
                        )}

                        {/* Terminal Codebox */}
                        <div className="hack-terminal-codebox">
                            <div className="terminal-header-dots">
                                <span className="dot dot-red" />
                                <span className="dot dot-yellow" />
                                <span className="dot dot-green" />
                                <span className="terminal-title">
                                    trojan_love_v22.exe - root@dat-hacker
                                </span>
                            </div>
                            <div className="terminal-content">
                                <p className="code-line green">
                                    &gt; Scanning target:{" "}
                                    <span className="highlight-target">
                                        Đỗ Thị Thu Quỳnh
                                    </span>
                                </p>
                                <p className="code-line cyan">
                                    &gt; Nhan sắc phát hiện:{" "}
                                    <span className="highlight-danger">
                                        CỰC PHẨM (Vượt quá 100/10)
                                    </span>
                                </p>
                                <p className="code-line red">
                                    &gt; Trạng thái: Toàn bộ thiết bị đã bị
                                    chiếm quyền kiểm soát!
                                </p>
                                <p className="code-line yellow">
                                    &gt; Âm thanh báo động: Đang kích hoạt nhịp
                                    đồng hồ clock.mp3...
                                </p>
                            </div>
                        </div>

                        {/* Main Prompt Request */}
                        <div className="hack-core-message">
                            <div className="lock-icon-wrap">
                                <Lock size={32} className="lock-pulse" />
                            </div>
                            <p className="hack-main-statement">
                                Thiết bị của bạn đã bị chiếm quyền kiểm soát!
                            </p>
                            <p className="hack-sub-requirement">
                                Hãy nhập{" "}
                                <span className="unlock-phrase">
                                    "Quỳnh yêu Đạt nhất"
                                </span>{" "}
                                để được mở khóa
                            </p>
                        </div>

                        {/* Unlock Form */}
                        <form
                            onSubmit={handleUnlockSubmit}
                            className="hack-unlock-form"
                        >
                            <div className="hack-input-wrapper">
                                <Terminal
                                    size={18}
                                    className="terminal-input-icon"
                                />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="hack-terminal-input"
                                    placeholder='Gõ "Quỳnh yêu Đạt nhất" vào đây...'
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        if (errorMessage) setErrorMessage(null);
                                    }}
                                    autoFocus
                                    required
                                />
                            </div>

                            {errorMessage && (
                                <div className="hack-error-notice">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="hack-actions-row">
                                <button
                                    type="submit"
                                    className="hack-submit-btn"
                                >
                                    <Unlock size={17} />
                                    <span>Giải mã &amp; Mở khóa ngay</span>
                                </button>

                                <button
                                    type="button"
                                    className="hack-bonus-time-btn"
                                    onClick={handleRequestBonusTime}
                                    title="Xin hacker gia hạn thêm thời gian"
                                >
                                    <PlusCircle size={15} />
                                    <span>Xin gia hạn +30s</span>
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    // UNLOCKED SWEET REWARD SCREEN
                    <div className="unlocked-reward-body">
                        <div className="reward-heart-burst">
                            <Heart
                                size={54}
                                fill="#ff4d6d"
                                color="#ff4d6d"
                                className="bounce-heart"
                            />
                            <Sparkles
                                size={28}
                                className="sparkle-top-right"
                                color="#ffd166"
                            />
                        </div>

                        <div className="reward-congrats-tag">
                            <CheckCircle2 size={16} />
                            <span>MỞ KHÓA THÀNH CÔNG!</span>
                        </div>

                        <h2 className="reward-title">
                            Anh Biết Mà, Quỳnh Yêu Đạt Nhất! 🥰
                        </h2>

                        <p className="reward-subtitle">
                            Hacker Phạm Tuấn Đạt xin chính thức đầu hàng trước
                            sự đáng yêu vô đối của em!
                        </p>

                        <div className="reward-gift-card">
                            <div className="reward-gift-header">
                                <span className="gift-tag-icon">🎁</span>
                                <h4>
                                    Món quà sinh nhật thật sự dành tặng Quỳnh:
                                </h4>
                            </div>
                            <ul className="reward-gift-list">
                                <li>
                                    <span className="li-bullet">💖</span>
                                    <span>
                                        <strong>Trọn vẹn trái tim anh:</strong>{" "}
                                        Trao tặng cho em độc quyền trọn đời,
                                        không bao giờ đổi thay!
                                    </span>
                                </li>
                                <li>
                                    <span className="li-bullet">🎬</span>
                                    <span>
                                        <strong>Chuyến hẹn hò trong mơ:</strong>{" "}
                                        Cùng em đi ăn mọi món em thích, đến mọi
                                        nơi em muốn đi!
                                    </span>
                                </li>
                                <li>
                                    <span className="li-bullet">💌</span>
                                    <span>
                                        <strong>Tấm vé đặc quyền:</strong> Hôm
                                        nay Quỳnh là công chúa số 1, bất cứ điều
                                        ước nào của em đều sẽ được anh thực
                                        hiện!
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <button
                            className="reward-claim-btn"
                            onClick={() => {
                                confetti({
                                    particleCount: 70,
                                    spread: 60,
                                    origin: { y: 0.6 },
                                });
                                handleCloseModal();
                            }}
                        >
                            <Heart size={16} fill="#fff" />
                            <span>Nhận quà &amp; Ôm anh một cái nhé 💕</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function HackTrollModal({
    isOpen,
    onClose,
    onLockStateChange,
    onUnlockedSuccess,
}: HackTrollModalProps): React.JSX.Element | null {
    if (!isOpen) return null;

    return (
        <HackTrollContent
            onClose={onClose}
            onLockStateChange={onLockStateChange}
            onUnlockedSuccess={onUnlockedSuccess}
        />
    );
}
