'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarIcon, Clock3Icon, LocateIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { IEvent } from '@/types';
import { extractCity } from '@/utils/eventUtils';

interface EventCardProps {
  event: IEvent;
  index: number;
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

const EventCard = memo(({ event, index }: EventCardProps) => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="w-[240px] md:w-[300px] shrink-0 transition-transform hover:scale-[1.02]">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-lg" />
          )}
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={`object-cover rounded-t-lg transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            sizes="(max-width: 768px) 240px, 300px"
            quality={85}
            onLoadingComplete={() => setImageLoading(false)}
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
            <span className="truncate">{extractCity(event.location)}</span>
          </div>
        </CardContent>
        <CardFooter className="px-3 md:px-4 pb-3 md:pb-4 pt-0 flex justify-between items-center">
          <PriceTag price={event.price} />
          <Link href={`/events/${event._id}`} passHref>
            <Button
              className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white h-7 md:h-8 text-xs md:text-sm px-2.5 md:px-3"
              aria-label={`Vezi detalii pentru ${event.title}`}
              onClick={handleButtonClick}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Se încarcă...</span>
                </div>
              ) : (
                'Vezi Detalii'
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
