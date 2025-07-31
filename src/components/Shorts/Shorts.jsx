import styles from "./Shorts.module.css"

export default function Shorts(props) {
    const { className } = props;

    return (
        <div class={styles.shorts + (className ? ` ${className}` : '')}>
            <div>Пн</div>
            <div>Вт</div>
            <div>Ср</div>
            <div>Чт</div>
            <div>Пт</div>
            <div>Сб</div>
            <div>Вс</div>
        </div>
    )
}