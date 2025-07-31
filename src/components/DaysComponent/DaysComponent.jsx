import Day from "../Day/Day";
import { useHelpers } from "./useHelpers";
import { memo } from "preact/compat";

import styles from "./DaysComponent.module.css"

const DaysComponent = (props) => {
    const { date, className } = props;
    const { days } = useHelpers(date);

    return (
        <div class={styles.days + (className ? ` ${className}` : '')} data-about='month'>
            {days.map((item, i) => <Day key={i} className={styles.day} day={item} />)}
        </div>
    )
}

export default memo(DaysComponent)