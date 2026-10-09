import React, { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CalendarDay {
    num: number | string;
    empty?: boolean;
    isHighlight?: boolean;
}

export default function CountdownCalendarSection(): React.JSX.Element {
    const targetDate = new Date("2026-10-09T23:59:00").getTime();

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    ),
                    minutes: Math.floor(
                        (difference % (1000 * 60 * 60)) / (1000 * 60),
                    ),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                // Event day reached / passed
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = window.setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const calendarDays: CalendarDay[] = [
        { num: "", empty: true },
        { num: "", empty: true },
        { num: "", empty: true },
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9, isHighlight: true },
        { num: 10 },
        { num: 11 },
        { num: 12 },
        { num: 13 },
        { num: 14 },
        { num: 15 },
        { num: 16 },
        { num: 17 },
        { num: 18 },
        { num: 19 },
        { num: 20 },
        { num: 21 },
        { num: 22 },
        { num: 23 },
        { num: 24 },
        { num: 25 },
        { num: 26 },
        { num: 27 },
        { num: 28 },
        { num: 29 },
        { num: 30 },
        { num: 31 },
    ];

    return (
        <section className="content-section">
            <ScrollReveal effect="sparkle-up" duration={900}>
                <div className="section-card">
                    <h2 className="section-header-tag">// Ngày bông hoa ấy ra đời //</h2>

                    {/* Real-time countdown boxes with staggered reveal */}
                    <div className="countdown-boxes">
                        <div className="countdown-box">
                            <div className="digit">{timeLeft.days}</div>
                            <div className="label">ngày</div>
                        </div>
                        <div className="countdown-box">
                            <div className="digit">
                                {String(timeLeft.hours).padStart(2, "0")}
                            </div>
                            <div className="label">giờ</div>
                        </div>
                        <div className="countdown-box">
                            <div className="digit">
                                {String(timeLeft.minutes).padStart(2, "0")}
                            </div>
                            <div className="label">phút</div>
                        </div>
                        <div className="countdown-box">
                            <div className="digit">
                                {String(timeLeft.seconds).padStart(2, "0")}
                            </div>
                            <div className="label">giây</div>
                        </div>
                    </div>

                    {/* Calendar Box */}
                    <div className="calendar-wrapper sparkle-shimmer-sweep">
                        <div className="calendar-header">10.2026</div>
                        <div className="calendar-watermark">2026</div>

                        <div className="calendar-grid">
                            <div className="day-name">T2</div>
                            <div className="day-name">T3</div>
                            <div className="day-name">T4</div>
                            <div className="day-name">T5</div>
                            <div className="day-name">T6</div>
                            <div className="day-name">T7</div>
                            <div className="day-name">CN</div>

                            {calendarDays.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={`day-num ${day.isHighlight ? "highlight-day" : ""}`}
                                >
                                    {day.isHighlight && (
                                        <img
                                            src="/assets/calen_heart.png"
                                            alt="Party day"
                                            className="heart-sticker"
                                        />
                                    )}
                                    {day.num}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event Time Details */}
                    <div className="event-details-text">
                        <div className="primary-date">
                            Thứ 6 ngày 09 tháng 10 năm 2026
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
