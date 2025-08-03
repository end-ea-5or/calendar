import { useState } from "preact/hooks"

export function useHelpers() {
    const [isVisibleSettings, setIsVisibleSettings] = useState(false);

    const onClickButton = (isChecked) => {
        setIsVisibleSettings(isChecked)
    }

    return { isVisibleSettings, onClickButton }
}