export function useHelpers(day) {
    const today = new Date();

    const dayNumber = typeof day === 'object' ? day.getDate() : day;
    const isActive = typeof day === 'object';
    const isToday = today.setHours(0, 0, 0, 0) - day === 0;

    return { dayNumber, isActive, isToday }
}