// @ts-ignore
import { useEffect, useState } from "preact/hooks";
import Button from "../Button/Button";

import styles from "./TodayButton.module.css"

export default function TodayButton(props) {
    const { className, onClick, currDate, ...others } = props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const yearNow = new Date().getFullYear();
        const monthNow = new Date().getMonth();
        const yearCurrent = currDate.getFullYear();
        const monthCurrent = currDate.getMonth();
        setIsVisible(!(yearNow === yearCurrent && monthNow === monthCurrent));
    }, [currDate]);

    return (
        <Button
            className={styles.button + (isVisible ? ` ${styles.visible}` : '')}
            onClick={onClick}
        >
            Сегодня
        </Button>
    )
}
