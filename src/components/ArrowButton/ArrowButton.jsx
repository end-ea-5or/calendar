// @ts-ignore
import ArrowIcon from "../../assets/svg/arrow-icon.svg?react"

import styles from "./ArrowButton.module.css"

export default function ArrowButton(props) {
    const { toRight, onClick, className, ...others } = props;
    
    return (
        <button
            class={styles.button + (toRight ? ` ${styles.right}` : "") + (className ? ` ${className}` : '')}
            onClick={onClick}
        >
            <ArrowIcon />
        </button>
    )
}
