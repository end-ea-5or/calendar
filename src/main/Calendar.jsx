import ArrowButton from "../components/ArrowButton/ArrowButton"
import DaysComponent from "../components/DaysComponent/DaysComponent"
import MonthYear from "../components/MonthYear/MonthYear"
import Shorts from "../components/Shorts/Shorts"
import { useHelpers } from "./useHelpers"
import useTouch from "../services/useTouch"
import TodayButton from "../components/TodayButton/TodayButton"

import styles from "./Calendar.module.css"

export default function Calendar() {
    const { months, calendarRef, changeMonth, onClickToday } = useHelpers();
    useTouch(calendarRef, changeMonth);

    return (
        <div class={styles.calendar} ref={calendarRef}>
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