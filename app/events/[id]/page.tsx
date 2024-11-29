import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import { ArrowLeft, CalendarIcon, Clock3Icon, LocateIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShareButton } from '@/components/ShareButton';
import Link from 'next/link';
import Image from 'next/image';
import { ParticipateButton } from '@/components/ParticipateButton';

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const PriceTag = () => {
    if (event.price.toLowerCase() === 'gratuit') {
      return (
        <span className="inline-block bg-green-200/50 text-green-500 px-3 py-1.5 rounded-full text-sm font-medium">
          Gratuit
        </span>
      );
    }
    return (
      <span className="inline-block bg-[#6a7bff]/10 text-[#6a7bff] px-3 py-1.5 rounded-full text-sm font-medium">
        {event.price}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost" className="group hover:bg-[#6a7bff]/10 -ml-2">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={event.image}
              alt={`${event.title} event`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
              <PriceTag />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarIcon className="w-5 h-5 text-[#6a7bff]" />
                <span>
                  {event.month} {event.day}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock3Icon className="w-5 h-5 text-[#6a7bff]" />
                <span>{event.hour}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <LocateIcon className="w-5 h-5 text-[#6a7bff]" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{event.about}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Category</h2>
                <span className="inline-block bg-[#6a7bff]/10 text-[#6a7bff] px-3 py-1.5 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Organizer</h2>
                <p className="text-muted-foreground">{event.organizer}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t flex justify-between items-center">
              <ParticipateButton />
              <ShareButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
