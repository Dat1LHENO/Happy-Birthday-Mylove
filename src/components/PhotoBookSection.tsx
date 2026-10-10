import React, { useState, useEffect, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Heart,
    Play,
    Pause,
    RotateCcw,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FlipBook = HTMLFlipBook as unknown as React.ComponentType<any>;

interface PhotoBookPage {
    id: number;
    type: "cover" | "photo" | "ending";
    image?: string;
    title: string;
    caption?: string;
    subtitle?: string;
    tag?: string;
}

const BOOK_PAGES: PhotoBookPage[] = [
    {
        id: 0,
        type: "cover",
        title: "KỶ NIỆM TUỔI 21",
        subtitle:
            "Cuốn sách lưu giữ những khoảnh khắc đẹp nhất của Đỗ Thị Thu Quỳnh",
        tag: "những trang sách kỷ niểm 💖",
    },
    {
        id: 1,
        type: "photo",
        image: "/assets/q7.jpeg",
        title: "Nụ cười rạng rỡ",
        caption: "Bông hoa tuyệt sắc tỏa sáng lung linh bên Tháp Bà Ponagar",
        tag: "Nha Trang Memories",
    },
    {
        id: 2,
        type: "photo",
        image: "/assets/q1.jpeg",
        title: "Đại dương xanh ngát",
        caption: "Góc nghiêng thần thánh trong lòng đại dương huyền ảo",
        tag: "Aquarium Date",
    },
    {
        id: 3,
        type: "photo",
        image: "/assets/q2.jpeg",
        title: "Công chúa bé bỏng",
        caption: "Ánh mắt trong veo và vẻ đáng yêu chẳng ai sánh bằng",
        tag: "Sweet Selfie",
    },
    {
        id: 4,
        type: "photo",
        image: "/assets/q3.jpeg",
        title: "Nét đẹp dịu dàng",
        caption: "Dáng hình thướt tha khiến tim anh lỡ nhịp mỗi lần ngắm nhìn",
        tag: "Ponagar Elegance",
    },
    {
        id: 5,
        type: "photo",
        image: "/assets/q6.jpeg",
        title: "Sắc hồng hoa giấy",
        caption: "Em tươi tắn và rạng ngời hơn cả ngàn đóa hoa mùa hạ",
        tag: "Summer Vibe",
    },
    {
        id: 6,
        type: "photo",
        image: "/assets/q5.jpeg",
        title: "OOTD xinh đẹp",
        caption:
            "Phong cách ngọt ngào, đáng yêu trong từng khoảnh khắc đời thường",
        tag: "Mirror Check",
    },
    {
        id: 7,
        type: "photo",
        image: "/assets/q8.jpeg",
        title: "Cá tính & Hiện đại",
        caption: "Chiếc kính râm cực ngầu cùng nụ cười duyên dáng",
        tag: "Chic & Cool",
    },
    {
        id: 8,
        type: "photo",
        image: "/assets/q4.jpeg",
        title: "Follow me to the sun",
        caption: "Nắm tay em qua những khung trời bình yên đầy nắng ấm",
        tag: "Hand in Hand",
    },
    {
        id: 9,
        type: "photo",
        image: "/assets/q9.jpg",
        title: "Đôi ta bên nhau",
        caption:
            "Khoảnh khắc ngọt ngào, ngập tràn tiếng cười và tình yêu của hai đứa",
        tag: "My Everything 💕",
    },
    {
        id: 10,
        type: "ending",
        title: "To be continued...",
        subtitle:
            "Hành trình phía trước, hãy cùng anh viết tiếp những trang sách hạnh phúc em nhé!",
        tag: "MÃI YÊU EM ❤️",
    },
];

interface PageProps {
    children: React.ReactNode;
    className?: string;
}

// FlipPage component must forward ref to a native HTMLDivElement for react-pageflip
const FlipPage = React.forwardRef<HTMLDivElement, PageProps>(
    ({ children, className = "" }, ref) => {
        return (
            <div className={`flip-book-page-wrap ${className}`} ref={ref}>
                <div className="flip-page-inner">{children}</div>
            </div>
        );
    },
);
FlipPage.displayName = "FlipPage";

export default function PhotoBookSection(): React.JSX.Element {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
    const flipBookRef = useRef<any>(null);

    const totalPages = BOOK_PAGES.length;

    const goToNextPage = () => {
        flipBookRef.current?.pageFlip()?.flipNext();
    };

    const goToPrevPage = () => {
        flipBookRef.current?.pageFlip()?.flipPrev();
    };

    const goToPage = (pageIndex: number) => {
        flipBookRef.current?.pageFlip()?.flip(pageIndex);
    };

    const handlePageFlip = useCallback((e: { data: number }) => {
        setCurrentPage(e.data);
    }, []);

    // Auto flip pages
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            const pf = flipBookRef.current?.pageFlip();
            if (!pf) return;
            const current = pf.getCurrentPageIndex();
            if (current < totalPages - 1) {
                pf.flipNext();
            } else {
                setIsAutoPlaying(false);
            }
        }, 3200);

        return () => clearInterval(timer);
    }, [isAutoPlaying, totalPages]);

    return (
        <section className="content-section photobook-section-anchor">
            {/* Header decoration */}
            <ScrollReveal effect="zoom-in" duration={700}>
                <div className="photobook-header-tag">
                    <BookOpen size={20} className="book-icon-spin" />
                    <span>QUYỂN SÁCH KỶ NIỆM</span>
                    <Sparkles size={18} className="sparkle-gold" />
                </div>
                <p className="photobook-subtag">
                    Lật giở từng trang ký ức thanh xuân của Quỳnh &amp; Đạt
                </p>
            </ScrollReveal>

            {/* The FlipBook Container */}
            <ScrollReveal effect="sparkle-up" delay={150} duration={850}>
                <div className="photobook-card-wrapper photobook-react-flip-wrapper">
                    {/* HTMLFlipBook Component */}
                    <FlipBook
                        width={350}
                        height={515}
                        size="stretch"
                        minWidth={280}
                        maxWidth={390}
                        minHeight={440}
                        maxHeight={560}
                        maxShadowOpacity={0.45}
                        showCover={false}
                        mobileScrollSupport={true}
                        usePortrait={true}
                        flippingTime={700}
                        drawShadow={true}
                        className="photobook-flipbook-instance"
                        ref={flipBookRef}
                        onFlip={handlePageFlip}
                    >
                        {/* Page 0: Cover */}
                        <FlipPage className="page-cover">
                            <div className="book-spine-left" />
                            <div className="washi-tape washi-tape-top" />
                            <div className="book-cover-page">
                                <div className="cover-inner-border">
                                    <div className="cover-tag">
                                        {BOOK_PAGES[0].tag}
                                    </div>
                                    <div className="cover-heart-badge">
                                        <Heart
                                            size={44}
                                            fill="#e65c7b"
                                            color="#e65c7b"
                                        />
                                    </div>
                                    <h3 className="cover-main-title">
                                        {BOOK_PAGES[0].title}
                                    </h3>
                                    <div className="cover-name-calligraphy">
                                        Đỗ Thị Thu Quỳnh &amp; Phạm Tuấn Đạt
                                    </div>
                                    <p className="cover-desc">
                                        {BOOK_PAGES[0].subtitle}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn-open-book-now"
                                        onClick={goToNextPage}
                                    >
                                        <span>Mở sách xem ảnh</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="book-page-footer">
                                <span className="page-number-pill">
                                    Bìa sách
                                </span>
                            </div>
                        </FlipPage>

                        {/* Pages 1..9: Photos */}
                        {BOOK_PAGES.slice(1, 10).map((page, idx) => (
                            <FlipPage key={page.id} className="page-photo">
                                <div className="book-spine-left" />
                                <div className="washi-tape washi-tape-top" />
                                <div className="book-photo-page">
                                    <div className="photo-tape-stamp">
                                        {page.tag}
                                    </div>

                                    {/* Photo Frame */}
                                    <div className="book-photo-frame sparkle-shimmer-sweep">
                                        <img
                                            src={page.image}
                                            alt={page.title}
                                            className="book-page-img"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Photo Note / Caption */}
                                    <div className="book-photo-info">
                                        <h4 className="book-photo-title">
                                            {page.title}
                                        </h4>
                                        <p className="book-photo-caption">
                                            "{page.caption}"
                                        </p>
                                    </div>
                                </div>
                                <div className="book-page-footer">
                                    <span className="page-number-pill">
                                        Trang {idx + 1} / 9
                                    </span>
                                </div>
                            </FlipPage>
                        ))}

                        {/* Page 10: Ending Page */}
                        <FlipPage className="page-ending">
                            <div className="book-spine-left" />
                            <div className="washi-tape washi-tape-top" />
                            <div className="book-ending-page">
                                <div className="ending-inner-box">
                                    <div className="ending-heart-icon">
                                        <Heart
                                            size={48}
                                            fill="#ff4d6d"
                                            color="#ff4d6d"
                                        />
                                    </div>
                                    <h3 className="ending-main-title">
                                        {BOOK_PAGES[10].title}
                                    </h3>
                                    <p className="ending-quote">
                                        {BOOK_PAGES[10].subtitle}
                                    </p>
                                    <div className="ending-couple-tag">
                                        Quỳnh &hearts; Đạt - Forever &amp;
                                        Always
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-restart-book"
                                        onClick={() => goToPage(0)}
                                    >
                                        <RotateCcw size={15} />
                                        <span>Xem lại từ trang đầu</span>
                                    </button>
                                </div>
                            </div>
                            <div className="book-page-footer">
                                <span className="page-number-pill">
                                    Trang kết
                                </span>
                            </div>
                        </FlipPage>
                    </FlipBook>

                    {/* Book Left & Right Nav Floating Buttons */}
                    <button
                        type="button"
                        className="book-nav-arrow book-nav-prev"
                        onClick={goToPrevPage}
                        title="Trang trước"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <button
                        type="button"
                        className="book-nav-arrow book-nav-next"
                        onClick={goToNextPage}
                        title="Trang kế tiếp"
                        aria-label="Next Page"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Bottom Controls: Auto-flip & Dots Navigation */}
                <div className="book-controls-bar">
                    <button
                        type="button"
                        className={`btn-autoflip ${isAutoPlaying ? "active" : ""}`}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        title={
                            isAutoPlaying
                                ? "Dừng tự động lật"
                                : "Tự động lật sách"
                        }
                    >
                        {isAutoPlaying ? (
                            <>
                                <Pause size={14} />
                                <span>Dừng lật</span>
                            </>
                        ) : (
                            <>
                                <Play size={14} fill="#e65c7b" />
                                <span>Tự động lật sách</span>
                            </>
                        )}
                    </button>

                    {/* Dots pagination */}
                    <div className="book-dots-nav">
                        {BOOK_PAGES.map((page, idx) => (
                            <button
                                type="button"
                                key={page.id}
                                className={`book-dot-item ${idx === currentPage ? "active" : ""}`}
                                onClick={() => goToPage(idx)}
                                title={`Đến trang ${idx + 1}`}
                                aria-label={`Go to page ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
