import { useMemo } from "preact/hooks";

export function useHelpers(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const days = useMemo(() => generateMonthDays(year, month), [year, month])
    
    return { days }
}

function generateMonthDays(year, month) {
    const days = [];
    const MAX_DAYS_IN_MONTH = 42;
    const firstDayCurrMonth = new Date(year, month, 1);
    const lastDayCurrMonth = new Date(year, month + 1, 0);
    const paddingStart = firstDayCurrMonth.getDay() === 0 ? 6 : firstDayCurrMonth.getDay() - 1;
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    // остаток предыдущего месяца
    for (let i = paddingStart - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, lastDayPrevMonth - i);
        days.push(date.getDate());
    }
    // текущий месяц
    for (let i = 1; i <= lastDayCurrMonth.getDate(); i++) {
        days.push(new Date(year, month, i))
    }
    // начало следующего месяца
    const total = days.length;
    let paddingEnd = MAX_DAYS_IN_MONTH % total;
    for (let i = 1; i <= paddingEnd; i++) {
        const date = new Date(year, month + 1, i);
        days.push(date.getDate());
    }
    return days;
};