import { useCallback, useMemo, useRef, useState } from "preact/hooks";

export function useHelpers() {
    const calendarRef = useRef(null);
    const [months, setMonths] = useState([
        new Date(new Date().getFullYear(), new Date().getMonth() - 1),
        new Date(),
        new Date(new Date().getFullYear(), new Date().getMonth() + 1)
    ]);


    const changeMonth = (dir) => {
        setMonths(prev => {
            if (dir === 'prev') {
                const newPrev = new Date(prev[0].getFullYear(), prev[0].getMonth() - 1)
                return [newPrev, prev[0], prev[1]]
            } else {
                const newNext = new Date(prev[2].getFullYear(), prev[2].getMonth() + 1)
                return [prev[1], prev[2], newNext]
            }
        })
    }

    return {
        months,
        calendarRef,
        changeMonth
    }
}