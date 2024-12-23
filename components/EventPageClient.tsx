'use client';

import { ArrowLeft, CalendarIcon, Clock3Icon, LocateIcon, Loader2, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/ShareButton';
import Link from 'next/link';
import Image from 'next/image';
import { ParticipateButton } from '@/components/ParticipateButton';
import { BottomCTA } from '@/components/BottomCTA';
import { IEvent } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

interface EventPageClientProps {
  event: IEvent;
}

export default function EventPageClient({ event }: EventPageClientProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const PriceTag = () => {
    if (event.price.toLowerCase() === 'gratuit') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Gratuit
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a7bff]/10 text-[#6a7bff]">
        {event.price}
      </span>
    );
  };

  const handleDriveClick = () => {
    const encodedAddress = encodeURIComponent(event.location);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const handleBack = () => {
    setIsNavigating(true);
  };

  const BackButton = () => (
    <Button
      variant="outline"
      className="bg-white/90 hover:bg-white"
      onClick={handleBack}
      disabled={isNavigating}
    >
      {isNavigating ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <ArrowLeft className="w-4 h-4 mr-2" />
      )}
      Înapoi
    </Button>
  );

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Acasă',
        item: 'https://evenimentecrestine.ro',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: event.title,
        item: `https://evenimentecrestine.ro/events/${event._id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden relative">
          {/* Navigation Buttons */}
          <div className="px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <BackButton />
            </Link>
            <ShareButton />
          </div>

          {/* Image Container - Mobile */}
          <div className="px-2">
            <div 
              className="relative bg-gray-50 rounded-2xl overflow-hidden"
              onClick={() => setIsImageFullScreen(true)}
            >
              <div className="relative w-full aspect-auto">
                {/* Scroll Indicator - Moved to top */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent pt-2 pb-8 flex flex-col items-center text-white">
                  <p className="text-sm font-medium mb-1">Scroll pentru mai multe informații</p>
                  <ChevronDown className="w-6 h-6 animate-bounce" />
                </div>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>

          {/* Full Screen Image Modal */}
          {isImageFullScreen && (
            <div className="fixed inset-0 z-50 bg-black">
              <button
                onClick={() => setIsImageFullScreen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                  quality={100}
                />
              </div>
            </div>
          )}

          {/* Content for mobile/tablet */}
          <div className="px-2 -mt-2 relative z-10">
            <div className="bg-white rounded-t-2xl">
              <div className="p-4 space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 break-words whitespace-normal">
                    {event.title}
                  </h1>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a7bff]/10 text-[#6a7bff]">
                      {event.category}
                    </span>
                    <PriceTag />
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <CalendarIcon className="w-6 h-6 text-[#6a7bff]" />
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
                        <Clock3Icon className="w-6 h-6 text-[#6a7bff]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ora</p>
                        <p className="text-base font-semibold text-gray-900">{event.hour}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div
                      onClick={handleDriveClick}
                      className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer group transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <LocateIcon className="w-6 h-6 text-[#6a7bff]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Locație</p>
                        <p className="text-base font-semibold text-gray-900">{event.location}</p>
                        <span className="text-sm text-[#6a7bff] group-hover:text-[#6a7bff]/90">
                          Deschide în Google Maps
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                      <Avatar className="h-12 w-12 bg-[#6a7bff]/10 text-[#6a7bff]">
                        <AvatarFallback>{event.organizer.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Organizator</p>
                        <p className="text-base font-semibold text-gray-900">{event.organizer}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section - Increased bottom padding */}
                <div className="space-y-6 pb-32">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Despre eveniment</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {event.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-8 max-w-7xl mx-auto p-4 lg:p-8 h-[calc(100vh-2rem)]">
          {/* Left side - Image */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden sticky top-8 h-[calc(100vh-4rem)]">
            <div className="relative w-full h-full">
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
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-4 lg:p-8 flex flex-col h-[calc(100vh-4rem)]">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
              <Link href="/">
                <BackButton />
              </Link>
              <ShareButton />
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
              {/* Header */}
              <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 break-words whitespace-normal">
                  {event.title}
                </h1>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a7bff]/10 text-[#6a7bff]">
                    {event.category}
                  </span>
                  <PriceTag />
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="w-6 h-6 text-[#6a7bff]" />
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
                      <Clock3Icon className="w-6 h-6 text-[#6a7bff]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ora</p>
                      <p className="text-base font-semibold text-gray-900">{event.hour}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div
                    onClick={handleDriveClick}
                    className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer group transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <LocateIcon className="w-6 h-6 text-[#6a7bff]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Locație</p>
                      <p className="text-base font-semibold text-gray-900">{event.location}</p>
                      <span className="text-sm text-[#6a7bff] group-hover:text-[#6a7bff]/90">
                        Open in Google Maps
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Avatar className="h-12 w-12 bg-[#6a7bff]/10 text-[#6a7bff]">
                      <AvatarFallback>{event.organizer.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">Organizator</p>
                      <p className="text-base font-semibold text-gray-900">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-6 pb-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Despre eveniment</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.about}</p>
                </div>
              </div>
            </div>

            {/* CTA Section - Always visible */}
            <div className="pt-6 border-t mt-4">
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

        {/* Bottom CTA Bar for Mobile - Always visible */}
        <BottomCTA isVisible={false} />
      </div>
      <style jsx global>{`
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </>
  );
}
