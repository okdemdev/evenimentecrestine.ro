export function generateEventStructuredData(event: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.about,
    startDate: `${event.month} ${event.day}, 2024 ${event.hour}`,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location,
        addressCountry: 'RO',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    offers: {
      '@type': 'Offer',
      price: event.price.toLowerCase() === 'gratuit' ? '0' : event.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'RON',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Evenimente Creștine',
  url: 'https://evenimentecrestine.ro',
  logo: 'https://evenimentecrestine.ro/icon.png',
  sameAs: [
    // Add your social media URLs here
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@evenimentecrestine.ro',
  },
};
