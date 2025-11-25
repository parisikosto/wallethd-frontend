interface WeekBudget {
  endDate: Date;
  label: string;
  startDate: Date;
}

export const getWeeksInMonth = (month: number, year: number): WeekBudget[] => {
  const weeks: WeekBudget[] = [];
  const firstDay = new Date(year, month, 1);

  const currentWeekStart = new Date(firstDay);
  const dayOfWeek = currentWeekStart.getDay();

  if (dayOfWeek !== 1) {
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    currentWeekStart.setDate(currentWeekStart.getDate() + daysUntilMonday);
  }

  while (currentWeekStart.getMonth() === month) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const formatDay = (date: Date) => {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
      });
    };

    const formatMonth = (date: Date) => {
      return date.toLocaleDateString('en-GB', {
        month: 'short',
      });
    };

    let label = '';
    if (currentWeekStart.getMonth() === weekEnd.getMonth()) {
      label = `${formatDay(currentWeekStart)}-${formatDay(
        weekEnd,
      )} ${formatMonth(weekEnd)}`;
    } else {
      label = `${formatDay(currentWeekStart)} ${formatMonth(
        currentWeekStart,
      )}-${formatDay(weekEnd)} ${formatMonth(weekEnd)}`;
    }

    weeks.push({
      endDate: new Date(weekEnd),
      label,
      startDate: new Date(currentWeekStart),
    });

    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
};
