import styles from "./Button.module.css"

export default function Button(props) {
    const { onClick, className, children, ...others } = props;

    return (
        <button
            class={styles.button + (className ? ` ${className}` : '')}
            onClick={onClick}
            {...others}
        >
            {children}
        </button>
    )
}
