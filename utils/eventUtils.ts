import { EventCardType } from '@/app/(root)/page';

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
  events: EventCardType[],
  userCity: string | null
): EventCardType[] => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  return [...events].sort((a, b) => {
    // If we have a user city, prioritize events from that city
    if (userCity) {
      const aInCity = a.location.toLowerCase().includes(userCity.toLowerCase());
      const bInCity = b.location.toLowerCase().includes(userCity.toLowerCase());

      if (aInCity !== bInCity) {
        return aInCity ? -1 : 1;
      }
    }

    // Then sort by date
    const monthA = getMonthNumber(a.month);
    const monthB = getMonthNumber(b.month);
    const dayA = parseInt(a.day);
    const dayB = parseInt(b.day);

    // Check if events are past or future relative to current date
    const isPassedA = monthA < currentMonth || (monthA === currentMonth && dayA < currentDay);
    const isPassedB = monthB < currentMonth || (monthB === currentMonth && dayB < currentDay);

    if (isPassedA !== isPassedB) {
      return isPassedA ? 1 : -1;
    }

    // If both are future or both are past, sort by date
    if (monthA !== monthB) {
      return monthA - monthB;
    }

    return dayA - dayB;
  });
};

export const groupEventsByDate = (events: EventCardType[]): Record<string, EventCardType[]> => {
  return events.reduce((acc: Record<string, EventCardType[]>, event) => {
    const dateKey = `${event.month}-${event.day}`;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});
};
