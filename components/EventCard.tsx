import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon, Clock3Icon, LocateIcon } from 'lucide-react';
import Link from 'next/link';
import { IEvent } from '@/types';

interface EventCardProps {
  event: IEvent;
}

const PriceTag = ({ price }: { price: string }) => {
  if (price.toLowerCase() === 'gratuit') {
    return (
      <span className="text-green-500 bg-green-200/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
        Gratuit
      </span>
    );
  }
  const formattedPrice = price.toLowerCase().replace('lei', '').replace('ron', '').trim();

  return (
    <span className="text-[#6a7bff] bg-[#6a7bff]/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
      {formattedPrice} RON
    </span>
  );
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-[240px] md:w-[300px] shrink-0 transition-transform hover:scale-[1.02]">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>
      <CardContent className="px-3 md:px-4 pt-2 md:pt-3">
        <h2 className="text-base md:text-xl font-semibold mb-1.5 md:mb-2 line-clamp-1">
          {event.title}
        </h2>
        <div className="flex items-center justify-between gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            <span className="truncate">
              {event.month} {event.day}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock3Icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            <span className="truncate">{event.hour}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
          <LocateIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="px-3 md:px-4 pb-3 md:pb-4 pt-0 flex justify-between items-center">
        <PriceTag price={event.price} />
        <Link href={`/events/${event._id}`} passHref>
          <Button className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white h-7 md:h-8 text-xs md:text-sm px-2.5 md:px-3">
            Vezi Detalii
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
