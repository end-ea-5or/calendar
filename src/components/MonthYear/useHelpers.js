import { useMemo } from "preact/hooks";

export function useHelpers(date) {
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    const monthYyear = useMemo(() => `${month} ${year}`, [month, year]);

    return { monthYyear }
}