import React from 'react';
import { Clock, MapPin, CalendarIcon, LocateIcon } from 'lucide-react';
import { EventCardType } from '@/app';

interface TimelineEventsProps {
  events: EventCardType[];
}

const getMonthAbbrev = (month: string): string => {
  const monthMap: { [key: string]: string } = {
    Ianuarie: 'Ian',
    Februarie: 'Feb',
    Martie: 'Mar',
    Aprilie: 'Apr',
    Mai: 'Mai',
    Iunie: 'Iun',
    Iulie: 'Iul',
    August: 'Aug',
    Septembrie: 'Sep',
    Octombrie: 'Oct',
    Noiembrie: 'Noi',
    Decembrie: 'Dec',
  };
  return monthMap[month] || month.substring(0, 3);
};

const getMonthNumber = (month: string): number => {
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

export default function TimelineEvents({ events }: TimelineEventsProps) {
  // Sort events by month and day
  const sortedEvents = [...events].sort((a, b) => {
    const monthA = getMonthNumber(a.month);
    const monthB = getMonthNumber(b.month);

    if (monthA !== monthB) {
      return monthA - monthB;
    }

    return parseInt(a.day) - parseInt(b.day);
  });

  // Group events by date
  const groupedEvents = sortedEvents.reduce((acc: { [key: string]: EventCardType[] }, event) => {
    const dateKey = `${event.month}-${event.day}`;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  return (
    <div className="mt-6">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[20px] md:left-[60px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6a7bff] to-purple-500 rounded-full" />

        {/* Events List */}
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => {
            const [month, day] = dateKey.split('-');

            return (
              <div key={dateKey} className="space-y-8">
                {dateEvents.map((event, index) => (
                  <div key={event._id} className="relative group">
                    {/* Date Box - Only show for first event in the group */}
                    {index === 0 && (
                      <div className="absolute left-0 md:left-[40px] z-10 flex flex-col items-center">
                        <div className="text-center bg-white p-1 rounded shadow-sm border border-gray-100 w-[45px]">
                          <div className="text-xs uppercase font-medium text-[#6a7bff]">
                            {getMonthAbbrev(month)}
                          </div>
                          <div className="text-lg font-bold text-gray-900">{day}</div>
                        </div>
                      </div>
                    )}

                    {/* Horizontal connector for multiple events */}
                    {index > 0 && (
                      <div className="absolute left-[20px] md:left-[60px] top-[20px] w-4 h-0.5 bg-gradient-to-r from-[#6a7bff] to-purple-500" />
                    )}

                    {/* Event Card */}
                    <div className="ml-16 md:ml-32 max-w-full md:max-w-2xl transform group-hover:-translate-y-1 transition-all duration-300">
                      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden group-hover:shadow-lg group-hover:border-[#6a7bff]/10 transition-transform hover:scale-[1.02] duration-300 p-4">
                        <div className="flex flex-col md:flex-row">
                          {/* Image Container */}
                          <div className="relative w-full md:w-48 lg:w-56 ">
                            <div className="aspect-[4/3] md:aspect-auto md:h-full">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-lg"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className="flex-1 p-3 md:p-4">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span>{event.hour}</span>
                              </div>
                            </div>

                            <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-[#6a7bff] transition-colors duration-300 line-clamp-2">
                              {event.title}
                            </h3>

                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1 shrink-0" />
                              <span className="text-sm line-clamp-1">{event.location}</span>
                            </div>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.about}</p>

                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6a7bff]/5 text-[#6a7bff]">
                                {event.category}
                              </span>
                              <button className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white h-7 text-xs px-2.5 rounded-md transition-colors duration-200">
                                Vezi Detalii
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
