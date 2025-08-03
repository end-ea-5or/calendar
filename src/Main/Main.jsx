

import BurgerButton from "../components/BurgerButton/BurgerButton"
import Calendar from "../components/Calendar/Calendar"
import Settings from "../components/Settings/Settings"
import { useHelpers } from "./useHelpers"

import styles from "./Main.module.css"

export default function Main() {
    const { isVisibleSettings, onClickButton } = useHelpers();

    return (
        <div class={styles.page}>
            <div class={styles.settings_button_container}>
                <BurgerButton className={styles.burger_button} onChange={onClickButton} />
            </div>
            <div class={styles.settings_container}>
                <Settings isOpen={isVisibleSettings} />
            </div>
            <div class={styles.calendar_container}>
                <Calendar />
            </div>
        </div>
    )
}