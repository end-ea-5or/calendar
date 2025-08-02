// @ts-ignore
import ArrowIcon from "../../assets/svg/arrow-icon.svg?react"
import Button from "../Button/Button";

import styles from "./ArrowButton.module.css"

export default function ArrowButton(props) {
    const { toRight, onClick, className, ...others } = props;
    
    return (
        <Button
            className={styles.button + (toRight ? ` ${styles.right}` : "") + (className ? ` ${className}` : '')}
            onClick={onClick}
        >
            <ArrowIcon />
        </Button>
    )
}
