import React, { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import HeroSection from "./components/HeroSection";
import PoemSection from "./components/PoemSection";
import GallerySection from "./components/GallerySection";
import CountdownCalendarSection from "./components/CountdownCalendarSection";
import PhotoBookSection from "./components/PhotoBookSection";
import BlessingFooter from "./components/BlessingFooter";
import FloatingToolbar from "./components/FloatingToolbar";
import WishModal from "./components/WishModal";
import GiftModal from "./components/GiftModal";
import HackTrollModal from "./components/HackTrollModal";
import HeartBurst from "./components/HeartBurst";
import SparkleScrollAtmosphere from "./components/SparkleScrollAtmosphere";
import { useAutoScroll } from "./hooks/useAutoScroll";
import type { Wish, SendGiftPayload, SubmitWishPayload } from "./types";

const INITIAL_WISHES: Wish[] = [
    {
        id: 1,
        author: "Lan Anh",
        message: "🌟 Chúc mừng ngày đặc biệt của bạn!",
    },
    {
        id: 2,
        author: "Tùng",
        message: "🎂 Chúc mừng sinh nhật! Chúc bạn luôn xinh đẹp và hạnh phúc!",
    },
    {
        id: 3,
        author: "Hiền",
        message: "💖 Chúc bạn có sinh nhật ngọt ngào và tràn đầy niềm vui!",
    },
    {
        id: 4,
        author: "Việt Anh",
        message: "🎯 Tuổi mới, đạt được mọi mục tiêu bạn đặt ra!",
    },
    {
        id: 5,
        author: "Lan Anh",
        message: "🎈 Sinh nhật vui vẻ, tuổi mới thành công rực rỡ!",
    },
];

export default function App(): React.JSX.Element {
    const [_wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
    const [likeCount, setLikeCount] = useState<number>(21);
    const [isWishModalOpen, setIsWishModalOpen] = useState<boolean>(false);
    const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
    const [isHackModalOpen, setIsHackModalOpen] = useState<boolean>(false);
    const [isHackLockActive, setIsHackLockActive] = useState<boolean>(false);
    const [musicForcePlayTrigger, setMusicForcePlayTrigger] = useState<number | null>(null);
    const [burstTrigger, setBurstTrigger] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage((prev) => (prev === msg ? null : prev));
        }, 3200);
    };

    // Auto scroll manager: smoothly scrolls to bottom then stops
    const { isAutoScrolling, toggleAutoScroll } = useAutoScroll({
        speed: 1.25,
        onReachEnd: () => {
            showToast("Đã cuộn đến cuối thiệp sinh nhật rồi nè! 💕");
        },
    });

    const handleBurstHearts = () => {
        setBurstTrigger(Date.now().toString());
    };

    const handleLike = () => {
        setLikeCount((prev) => prev + 1);
        handleBurstHearts();
        showToast("Cảm ơn bạn đã thả tim cho Quỳnh nhó ❤️");
    };

    const handleSubmitWish = ({ author, message }: SubmitWishPayload) => {
        const newWish: Wish = {
            id: Date.now(),
            author,
            message,
        };
        setWishes((prev) => [newWish, ...prev]);
        handleBurstHearts();
        showToast("Đã gửi lời chúc thành công! 💖");
    };

    const handleSendGift = ({ sender, gift }: SendGiftPayload) => {
        const giftWish: Wish = {
            id: Date.now(),
            author: sender,
            message: `Đã tặng món quà: ${gift.name} ${gift.emoji}`,
        };
        setWishes((prev) => [giftWish, ...prev]);
        handleBurstHearts();
        showToast(
            `Cảm ơn ${sender} đã tặng món quà "${gift.name} tới Quỳnh nhó"! 🎁✨`,
        );
    };

    return (
        <div className="app-viewport">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="toast-notice">
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Floating Particles for Hearts */}
            <HeartBurst triggerId={burstTrigger} />

            {/* Main Container */}
            <main className="invitation-container">
                {/* Dynamic Scroll Progress & Ambient Twinkling Atmosphere */}
                <SparkleScrollAtmosphere />

                {/* Background Music Record Button (automatically muted/paused during hack prank) */}
                <MusicPlayer
                    isExternalPaused={isHackLockActive}
                    forcePlayTrigger={musicForcePlayTrigger}
                />

                {/* Section 1: Hero & Invitation Title */}
                <HeroSection
                    onStartAutoScroll={toggleAutoScroll}
                    isAutoScrolling={isAutoScrolling}
                />

                {/* Section 2: Poem & Memories */}
                <PoemSection />

                {/* Section 3: Gallery Collage */}
                <GallerySection />

                {/* Section 3.5: Interactive Photo Book */}
                <PhotoBookSection />

                {/* Section 4: Event Countdown & Calendar */}
                <CountdownCalendarSection />

                {/* Section 7: Blessing Footer with Secret Gift button */}
                <BlessingFooter
                    onOpenHackGift={() => {
                        setIsHackModalOpen(true);
                        setIsHackLockActive(true);
                    }}
                />

                {/* Bottom Floating Interaction Toolbar */}
                <FloatingToolbar
                    onOpenWishModal={() => setIsWishModalOpen(true)}
                    onOpenGiftModal={() => setIsGiftModalOpen(true)}
                    onBurstHearts={handleBurstHearts}
                    onLike={handleLike}
                    likeCount={likeCount}
                    isAutoScrolling={isAutoScrolling}
                    onToggleAutoScroll={toggleAutoScroll}
                />
            </main>

            {/* Wish Modal */}
            <WishModal
                isOpen={isWishModalOpen}
                onClose={() => setIsWishModalOpen(false)}
                onSubmitWish={handleSubmitWish}
            />

            {/* Gift Modal */}
            <GiftModal
                isOpen={isGiftModalOpen}
                onClose={() => setIsGiftModalOpen(false)}
                onSendGift={handleSendGift}
            />

            {/* Secret Troll Hacker Gift Modal */}
            <HackTrollModal
                isOpen={isHackModalOpen}
                onClose={() => {
                    setIsHackModalOpen(false);
                    setIsHackLockActive(false);
                }}
                onLockStateChange={(isLocked) => setIsHackLockActive(isLocked)}
                onUnlockedSuccess={() => {
                    setMusicForcePlayTrigger(Date.now());
                    showToast("Mở khóa thành công! Chúc mừng sinh nhật Quỳnh yêu! 💖");
                }}
            />
        </div>
    );
}
