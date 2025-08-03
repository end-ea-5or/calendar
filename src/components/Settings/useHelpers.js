import { useEffect, useRef, useState } from "preact/hooks"

export function useHelpers(isOpen) {
    const overlayRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isMounted && overlayRef?.current) {
            requestAnimationFrame(() => setIsVisible(true))
            overlayRef?.current?.focus();
        }
    }, [isMounted]);

    useEffect(() => {
        if (!isOpen && isVisible) {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), 250)
        }
    }, [isOpen, isVisible]);


    return { isVisible, isMounted, overlayRef }
}