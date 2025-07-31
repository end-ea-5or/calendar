import { useHelpers } from "./useHelpers";

import styles from "./Day.module.css"

export default function Day(props) {
    const { day, className, ...others } = props;
    const { dayNumber, isActive, isToday } = useHelpers(day);

    return (
        <div
            class={styles.day + (className ? ` ${className}` : '') + (isActive ? ` ${styles.active}` : '') + (isToday ? ` ${styles.today}` : '')}
            {...others}
        >
            {dayNumber}
        </div>
    )
}