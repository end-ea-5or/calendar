import { useHelpers } from "./useHelpers";

import styles from "./MonthYear.module.css"

export default function MonthYear(props) {
    const { date, className } = props;
    const { monthYyear } = useHelpers(date);

    return (
        <span class={styles.month_year + (className ? ` ${className}` : '')}>
            {monthYyear}
        </span>
    )
}