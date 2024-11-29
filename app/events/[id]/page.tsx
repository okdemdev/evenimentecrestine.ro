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
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden relative">
        {/* Back Button for mobile/tablet */}
        <div className="fixed top-4 left-4 z-20">
          <Link href="/">
            <Button variant="outline" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi
            </Button>
          </Link>
        </div>

        {/* Image Container - Mobile */}
        <div className="px-4 pt-4">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden min-h-[300px] h-[50vh] w-full flex items-center justify-center">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover w-full h-full"
              priority
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>

        {/* Content for mobile/tablet */}
        <div className="px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-t-2xl shadow-lg">
            <div className="p-4 sm:p-6 space-y-6">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                <div className="flex items-center gap-3">
                  <PriceTag />
                  <ShareButton />
                </div>
              </div>

              {/* Event Details Grid - Mobile */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                </div>

                {/* Location and Organizer in column */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      <LocateIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Locație</p>
                      <p className="text-base font-semibold text-gray-900">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      <Users2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Organizator</p>
                      <p className="text-base font-semibold text-gray-900">{event.organizer}</p>
                    </div>
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

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-2 gap-8 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Left side - Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <div className="relative h-[calc(100vh-8rem)] w-full flex items-center justify-center">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover w-full h-full"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={100}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 lg:p-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Înapoi
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex items-center gap-3">
              <PriceTag />
              <ShareButton />
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
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

            {/* Location - Full width */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <LocateIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Locație</p>
                  <p className="text-base font-semibold text-gray-900">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Organizer - Full width */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <Users2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Organizator</p>
                  <p className="text-base font-semibold text-gray-900">{event.organizer}</p>
                </div>
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
  );
}
