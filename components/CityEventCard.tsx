'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, Clock3Icon, MapPinIcon } from 'lucide-react';
import { IEvent } from '@/types';

const PriceTag = ({ price }: { price: string }) => {
  if (price.toLowerCase() === 'gratuit') {
    return (
      <span className="text-green-500 bg-green-200/50 px-2 py-1 rounded-full text-sm font-medium">
        Gratuit
      </span>
    );
  }
  return (
    <span className="text-[#6a7bff] bg-[#6a7bff]/10 px-2 py-1 rounded-full text-sm font-medium">
      {price}
    </span>
  );
};

export default function CityEventCard({ event }: { event: IEvent }) {
  return (
    <Link 
      href={`/events/${event._id}`}
      className="group"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#6a7bff]/10">
        {/* Event Image */}
        <div className="relative w-full aspect-video">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Event Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a7bff]/10 text-[#6a7bff]">
              {event.category}
            </span>
            <PriceTag price={event.price} />
          </div>
          <h3 className="text-xl font-semibold mb-4 group-hover:text-[#6a7bff] transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#6a7bff]" />
              <span>{event.day} {event.month}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3Icon className="w-4 h-4 text-[#6a7bff]" />
              <span>{event.hour}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-[#6a7bff]" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 