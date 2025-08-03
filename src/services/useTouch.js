import { useEffect, useRef } from "preact/hooks";

const THRESHOLD_SPEED = 0.5;

export default function useTouch(calendarRef, changeMonthHandler) {
    const calendarWidth = useRef(null);
    const activeTouchId = useRef(null);
    const startX = useRef(null);
    const deltaX = useRef(null);
    const currentX = useRef(null);
    const startTime = useRef(null);
    const cellGap = useRef(getWCellGap());
    const prevMonth = useRef(null);
    const currentMonth = useRef(null);
    const nextMonth = useRef(null);

    useEffect(() => {
        if (!calendarRef.current) return;
        calendarRef.current.addEventListener('touchstart', touchStartHandler);
        calendarRef.current.addEventListener('touchmove', touchMoveHandler);
        calendarRef.current.addEventListener('touchend', touchEndHandler);
        calendarRef.current.addEventListener('touchcancel', touchEndHandler);
        window.addEventListener('resize', getCalendarSize);
        return () => {
            calendarRef.current.removeEventListener('touchstart', touchStartHandler);
            calendarRef.current.removeEventListener('touchmove', touchMoveHandler);
            calendarRef.current.removeEventListener('touchend', touchEndHandler);
            calendarRef.current.removeEventListener('touchcancel', touchEndHandler);
            window.removeEventListener('resize', getCalendarSize);
        }
    }, []);

    function getCalendarSize() {
        calendarWidth.current = getWidth(calendarRef);
        cellGap.current = getWCellGap();
    }

    function getWidth(ref) {
        return ref.current ? ref.current.clientWidth : 0
    }

    function getWCellGap() {
        return getComputedStyle(document.documentElement).getPropertyValue('--gap-size');
    }

    function touchStartHandler(e) {
        if (!calendarWidth.current) calendarWidth.current = getWidth(calendarRef);
        if (activeTouchId.current !== null) return;

        activeTouchId.current = e.changedTouches[0].identifier;
        startX.current = e.changedTouches[0].clientX;
        deltaX.current = 0;
        startTime.current = Date.now();
        const months = calendarRef.current.querySelectorAll('[data-about="month"]');
        prevMonth.current = months[0];
        currentMonth.current = months[1];
        nextMonth.current = months[2];
    }

    function touchMoveHandler(e) {
        const touch = [...e.changedTouches].find(t => t.identifier === activeTouchId.current);
        if (!touch) return;

        currentX.current = touch.clientX;
        deltaX.current = currentX.current - startX.current;
        if (Math.abs(deltaX.current) > calendarWidth.current) return;

        prevMonth.current.style.transition = 'none';
        currentMonth.current.style.transition = 'none';
        nextMonth.current.style.transition = 'none';

        prevMonth.current.style.transform = `translateX(calc(-${calendarWidth.current}px - ${cellGap.current} + ${deltaX.current}px))`;
        currentMonth.current.style.transform = `translateX(${deltaX.current}px)`;
        nextMonth.current.style.transform = `translateX(calc(${calendarWidth.current}px + ${cellGap.current} + ${deltaX.current}px))`;
    }

    function touchEndHandler(e) {
        const touch = [...e.changedTouches].find(t => t.identifier === activeTouchId.current);
        if (!touch) return;
        if (deltaX.current === 0) {
            activeTouchId.current = null;
            return
        };

        const length = e.changedTouches.length;
        const endX = e.changedTouches[length - 1].clientX;
        const endTime = Date.now();

        const time = endTime - startTime.current;
        const speed = +((Math.abs(deltaX.current) / time).toFixed(2));

        if (speed > THRESHOLD_SPEED || calendarWidth.current / Math.abs(deltaX.current) < 3) {
            const dir = deltaX.current > 0 ? 'prev' : 'next';
            changeMonthHandler(dir);
        }

        prevMonth.current.style.cssText = ``;
        currentMonth.current.style.cssText = ``;
        nextMonth.current.style.cssText = ``;

        prevMonth.current = null;
        currentMonth.current = null;
        nextMonth.current = null;

        activeTouchId.current = null;
    }
}