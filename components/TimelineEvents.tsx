import React, { useMemo } from 'react';
import { Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IEvent } from '@/types';
import { getMonthNumber, groupEventsByDate, extractCity } from '@/utils/eventUtils';
import { SubscribeForm } from '@/components/SubscribeForm';
import { TimelineEventSkeleton } from '@/components/skeletons/TimelineEventSkeleton';

interface TimelineEventsProps {
  events: IEvent[];
  loading: boolean;
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

const PriceTag = ({ price }: { price: string }) => {
  const isGratuit = price.toLowerCase() === 'gratuit';
  return (
    <span
      className={`${
        isGratuit ? 'text-green-500 bg-green-200/50' : 'text-[#6a7bff] bg-[#6a7bff]/10'
      } px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium`}
    >
      {isGratuit ? 'Gratuit' : `${price} RON`}
    </span>
  );
};

export default function TimelineEvents({
  events = [],
  loading,
}: TimelineEventsProps) {
  const sortedEvents = useMemo(() => {
    if (!events || events.length === 0) return [];

    return [...events].sort((a, b) => {
      const monthA = getMonthNumber(a.month);
      const monthB = getMonthNumber(b.month);

      if (monthA !== monthB) {
        return monthA - monthB;
      }

      return parseInt(a.day) - parseInt(b.day);
    });
  }, [events]);

  const groupedEvents = useMemo(() => {
    return groupEventsByDate(sortedEvents);
  }, [sortedEvents]);

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <TimelineEventSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return <div className="mt-6 text-center text-gray-500">Nu există evenimente disponibile.</div>;
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute left-[20px] md:left-[60px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6a7bff] to-purple-500 rounded-full" />

        <div className="space-y-12">
          {Object.entries(groupedEvents).map(([dateKey, dateEvents]) => {
            const [month, day] = dateKey.split('-');

            return (
              <div key={dateKey} className="space-y-12">
                {dateEvents.map((event, index) => (
                  <div key={event._id} className="relative group">
                    {index === 0 && (
                      <div className="absolute left-0 md:left-[40px] z-10 flex flex-col items-center">
                        <div className="text-center bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-[50px]">
                          <div className="text-xs uppercase font-medium text-[#6a7bff]">
                            {getMonthAbbrev(month)}
                          </div>
                          <div className="text-lg font-bold text-gray-900">{day}</div>
                        </div>
                      </div>
                    )}

                    {index > 0 && (
                      <div className="absolute left-[20px] md:left-[60px] top-[24px] w-4 h-0.5 bg-gradient-to-r from-[#6a7bff] to-purple-500" />
                    )}

                    <div className="ml-16 md:ml-32 max-w-full md:max-w-3xl transform group-hover:-translate-y-1 transition-all duration-300">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-lg group-hover:border-[#6a7bff]/10 transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-64 h-40 md:h-auto">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                              loading="lazy"
                            />
                          </div>

                          <div className="flex-1 p-3 md:p-5 flex flex-col">
                            <div className="flex-1 space-y-3 md:space-y-4">
                              <div>
                                <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                  <span>{event.hour}</span>
                                </div>
                                <h3 className="text-base md:text-xl font-semibold text-gray-900 group-hover:text-[#6a7bff] transition-colors duration-300 line-clamp-2">
                                  {event.title}
                                </h3>
                              </div>

                              <div className="flex items-center gap-1.5 text-gray-600">
                                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                                <span className="text-xs md:text-sm line-clamp-1">
                                  {extractCity(event.location)}
                                </span>
                              </div>

                              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                {event.about}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-3 md:mt-5 pt-3 md:pt-5 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium bg-[#6a7bff]/5 text-[#6a7bff]">
                                  {event.category}
                                </span>
                                <PriceTag price={event.price} />
                              </div>
                              <Link href={`/events/${event._id}`}>
                                <Button className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white h-7 md:h-8 text-xs md:text-sm px-2 md:px-3">
                                  Vezi Detalii
                                </Button>
                              </Link>
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

          {/* End of Timeline Indicator */}
          <div className="relative">
            <div className="absolute left-[12px] md:left-[52px] w-4 h-4 rounded-full bg-gradient-to-r from-[#6a7bff] to-purple-500" />
            <div className="ml-16 md:ml-32 bg-white rounded-xl p-4 md:p-8 text-center border border-gray-100 shadow-sm">
              <div className="max-w-md mx-auto">
                <div className="space-y-2 mb-4">
                  <p className="text-gray-900 font-semibold">
                    Nu mai sunt evenimente disponibile pentru moment.
                  </p>
                  <p className="text-sm text-gray-600">
                    Adaugă email-ul tău pentru a primi notificări când evenimente noi vor apărea!
                  </p>
                </div>
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
