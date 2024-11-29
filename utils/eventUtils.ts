import { IEvent } from '@/types';

export const getMonthNumber = (month: string): number => {
  const monthMap: { [key: string]: number } = {
    Ianuarie: 1,
    Februarie: 2,
    Martie: 3,
    Aprilie: 4,
    Mai: 5,
    Iunie: 6,
    Iulie: 7,
    August: 8,
    Septembrie: 9,
    Octombrie: 10,
    Noiembrie: 11,
    Decembrie: 12,
  };
  return monthMap[month] || 0;
};

export const sortEventsByDateAndLocation = (
  events: IEvent[],
  userCity: string | null
): IEvent[] => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  return [...events].sort((a, b) => {
    if (userCity) {
      const aInCity = a.location.toLowerCase().includes(userCity.toLowerCase());
      const bInCity = b.location.toLowerCase().includes(userCity.toLowerCase());

      if (aInCity !== bInCity) {
        return aInCity ? -1 : 1;
      }
    }

    const monthA = getMonthNumber(a.month);
    const monthB = getMonthNumber(b.month);
    const dayA = parseInt(a.day);
    const dayB = parseInt(b.day);

    const isPassedA = monthA < currentMonth || (monthA === currentMonth && dayA < currentDay);
    const isPassedB = monthB < currentMonth || (monthB === currentMonth && dayB < currentDay);

    if (isPassedA !== isPassedB) {
      return isPassedA ? 1 : -1;
    }

    if (monthA !== monthB) {
      return monthA - monthB;
    }

    return dayA - dayB;
  });
};

export const groupEventsByDate = (events: IEvent[]): Record<string, IEvent[]> => {
  return events.reduce((acc: Record<string, IEvent[]>, event) => {
    const dateKey = `${event.month}-${event.day}`;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});
};

export const extractCity = (location: string): string => {
  return location.split(',')[0].trim();
};
