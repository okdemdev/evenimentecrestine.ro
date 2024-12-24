import { IEvent } from '@/types';

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Evenimente Creștine',
  url: 'https://evenimentecrestine.ro',
  logo: 'https://evenimentecrestine.ro/icon.png',
  sameAs: [
    'https://facebook.com/evenimentecrestine',
    'https://instagram.com/evenimentecrestine'
  ],
  description: 'Platforma pentru evenimente creștine din România - conferințe, concerte, seminarii și întâlniri creștine.'
};

export const generateEventStructuredData = (event: IEvent) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.about,
    image: event.image,
    startDate: `2024-${getMonthNumber(event.month)}-${event.day}T${event.hour}`,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.split(',')[0].trim(),
        addressCountry: 'RO'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer
    },
    offers: {
      '@type': 'Offer',
      price: event.price.toLowerCase() === 'gratuit' ? '0' : event.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'RON',
      availability: 'https://schema.org/InStock'
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
  };
};

const getMonthNumber = (month: string): string => {
  const monthMap: { [key: string]: string } = {
    'Ianuarie': '01',
    'Februarie': '02',
    'Martie': '03',
    'Aprilie': '04',
    'Mai': '05',
    'Iunie': '06',
    'Iulie': '07',
    'August': '08',
    'Septembrie': '09',
    'Octombrie': '10',
    'Noiembrie': '11',
    'Decembrie': '12'
  };
  return monthMap[month] || '01';
};
