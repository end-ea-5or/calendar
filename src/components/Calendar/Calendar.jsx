import ArrowButton from "../ArrowButton/ArrowButton"
import DaysComponent from "../DaysComponent/DaysComponent"
import MonthYear from "../MonthYear/MonthYear"
import Shorts from "../Shorts/Shorts"
import useTouch from "../../services/useTouch"
import TodayButton from "../TodayButton/TodayButton"
import { useHelpers } from "./useHelpers"

import styles from "./Calendar.module.css"

export default function Calendar(props) {
    const {className, ...others} = props || {};
    const { months, calendarRef, changeMonth, onClickToday } = useHelpers();

    useTouch(calendarRef, changeMonth);

    return (
        <div class={styles.calendar + (className ? ` ${className}` : '')} ref={calendarRef} {...others}>
            <div class={styles.month_year}>
                <ArrowButton className={styles.arrow} onClick={() => changeMonth('prev')} />
                <MonthYear date={months[1]} className={styles.date} />
                <ArrowButton toRight className={styles.arrow} onClick={() => changeMonth('next')} />
            </div>
            <Shorts />
            <div class={styles.days_container}>
                {months.map(month =>
                    <DaysComponent
                        key={month.toISOString()}
                        className={styles.days_item}
                        date={month}
                    />
                )}
            </div>
            <div class={styles.today_container}>
                <TodayButton currDate={months[1]} onClick={onClickToday}/>
            </div>
        </div>
    )
}