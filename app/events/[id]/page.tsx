import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import { ArrowLeft, CalendarIcon, Clock3Icon, LocateIcon, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Gratuit
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {event.price}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
        <Image src={event.image} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="outline" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users2 className="w-4 h-4" />
                  <span>Organizator: {event.organizer}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PriceTag />
                <ShareButton />
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Data</p>
                  <p className="text-base font-semibold text-gray-900">
                    {event.day} {event.month}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <Clock3Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Ora</p>
                  <p className="text-base font-semibold text-gray-900">{event.hour}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <LocateIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Locație</p>
                  <p className="text-base font-semibold text-gray-900">{event.location}</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Despre eveniment</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.about}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Categorie</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {event.category}
                </span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-10 pt-6 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Vrei să participi?</h3>
                  <p className="text-gray-600">Înregistrează-te acum pentru acest eveniment</p>
                </div>
                <ParticipateButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
