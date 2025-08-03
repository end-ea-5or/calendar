import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./Settings.module.css"
import { createPortal } from "preact/compat";
import { useHelpers } from "./useHelpers";

const root = document.getElementById('modals');

export default function Settings(props) {
    const { isOpen, className, ...others } = props;
    const { isVisible, isMounted, overlayRef } = useHelpers(isOpen);

    if (!isMounted) return null;

    return createPortal(
        <div
            className={styles.overlay + (isVisible ? ` ${styles.visible}` : '') + (className ? ` ${className}` : '')}
            ref={overlayRef}
            {...others}
        >
            <div
                class={styles.settings + (isVisible ? ` ${styles.visible}` : '')}
                {...others}
            >
                <ul class={styles.settings_list}>
                    <li>Настройки</li>
                    <li>Сервис</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>,
        root
    );
}