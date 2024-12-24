import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEvents } from '@/app/actions/events';
import { extractCity } from '@/utils/eventUtils';
import { generateEventStructuredData } from '@/utils/structuredData';
import CityHeroImage from '@/components/CityHeroImage';

// List of major cities we want to generate pages for
const majorCities = [
  'București',
  'Cluj-Napoca',
  'Timișoara',
  'Iași',
  'Oradea',
  'Brașov'
];

// Function to format city name for URLs and file paths
function formatCityForPath(city: string): string {
  return city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ț/g, 't')
    .replace(/ș/g, 's')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to get city image path
function getCityImagePath(city: string): string {
  return `/images/cities/${formatCityForPath(city)}.jpg`;
}

// Generate static params for major cities
export function generateStaticParams() {
  return majorCities.map((city) => ({
    city: formatCityForPath(city),
  }));
}

// Generate metadata for each city page
export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const formattedCity = majorCities.find(
    (city) => formatCityForPath(city) === params.city
  ) || params.city;

  return {
    title: `Evenimente Creștine în ${formattedCity} | EvenimenteCrestine.ro`,
    description: `Descoperă cele mai importante evenimente creștine organizate în ${formattedCity}. Conferințe, concerte, seminarii și întâlniri creștine.`,
    openGraph: {
      title: `Evenimente Creștine în ${formattedCity}`,
      description: `Descoperă cele mai importante evenimente creștine organizate în ${formattedCity}. Conferințe, concerte, seminarii și întâlniri creștine.`,
      images: [getCityImagePath(formattedCity)],
    },
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  // Find the matching city from our major cities list
  const formattedCity = majorCities.find(
    (city) => formatCityForPath(city) === params.city
  );

  // If no matching city is found, return 404
  if (!formattedCity) {
    notFound();
  }

  // Fetch events for this city
  const events = await getEvents();
  const cityEvents = events.filter((event) => {
    const eventCity = extractCity(event.location);
    return eventCity && eventCity.toLowerCase() === formattedCity.toLowerCase();
  });

  // Get unique categories and organizers for statistics
  const categories = [...new Set(cityEvents.map((event) => event.category))];
  const organizers = [...new Set(cityEvents.map((event) => event.organizer))];

  // Generate structured data for events
  const structuredData = cityEvents.map(generateEventStructuredData);

  return (
    <>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <CityHeroImage
          src={getCityImagePath(formattedCity)}
          alt={`Evenimente Creștine în ${formattedCity}`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Evenimente Creștine în {formattedCity}
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
            Descoperă cele mai importante evenimente creștine organizate în {formattedCity}
          </p>
          <Link href="/">
            <Button className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white">
              Vezi Toate Evenimentele
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{cityEvents.length}</h3>
              <p className="text-gray-600">Evenimente Active</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{categories.length}</h3>
              <p className="text-gray-600">Categorii</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">{organizers.length}</h3>
              <p className="text-gray-600">Organizatori</p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Evenimente în {formattedCity}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityEvents.map((event) => (
              <div
                key={event._id.toString()}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Event card content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.location}</p>
                  <p className="text-gray-500">
                    {event.day} {event.month}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#6a7bff] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Explorează Toate Evenimentele Creștine
          </h2>
          <p className="text-xl mb-8">
            Descoperă mai multe evenimente și rămâi conectat cu comunitatea creștină
          </p>
          <Link href="/">
            <Button className="bg-white text-[#6a7bff] hover:bg-gray-100">
              Vezi Toate Evenimentele
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
} 