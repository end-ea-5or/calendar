import styles from "./BurgerButton.module.css"

export default function BurgerButton(props) {
    const { onChange, className, ...others } = props;

    const onChangeHandler = (e) => {
        if (typeof onChange === 'function') onChange(e.target.checked)
    }

    return (
        <label
            class={styles.burger + (className ? ` ${className}` : '')}
            for="burger-checkbox"
            {...others}
        >
            <input
                class={styles.burger_checkbox}
                id="burger-checkbox"
                type="checkbox"
                defaultChecked={false}
                onChange={onChangeHandler}
            />
        </label>
    )
}
