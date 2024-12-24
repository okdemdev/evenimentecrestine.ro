import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEvents } from '@/app/actions/events';
import { extractCity } from '@/utils/eventUtils';
import { generateEventStructuredData } from '@/utils/structuredData';

// List of major cities we want to generate pages for
const majorCities = [
  'București',
  'Cluj-Napoca',
  'Timișoara',
  'Iași',
  'Oradea',
  'Brașov'
];

export async function generateStaticParams() {
  return majorCities.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityName = decodeURIComponent(params.city);
  const formattedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  if (!majorCities.map(city => city.toLowerCase()).includes(cityName.toLowerCase())) {
    return notFound();
  }

  return {
    title: `Evenimente Creștine în ${formattedCity}`,
    description: `Descoperă cele mai importante evenimente creștine din ${formattedCity}. Conferințe, concerte, seminarii și întâlniri creștine organizate în ${formattedCity}.`,
    alternates: {
      canonical: `https://evenimentecrestine.ro/orase/${cityName.toLowerCase()}`,
    },
    openGraph: {
      title: `Evenimente Creștine în ${formattedCity}`,
      description: `Descoperă cele mai importante evenimente creștine din ${formattedCity}. Conferințe, concerte, seminarii și întâlniri creștine organizate în ${formattedCity}.`,
      url: `https://evenimentecrestine.ro/orase/${cityName.toLowerCase()}`,
      siteName: 'Evenimente Creștine',
      locale: 'ro_RO',
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const cityName = decodeURIComponent(params.city);
  const formattedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
  if (!majorCities.map(city => city.toLowerCase()).includes(cityName.toLowerCase())) {
    return notFound();
  }

  const allEvents = await getEvents();
  const cityEvents = allEvents.filter(event => 
    extractCity(event.location).toLowerCase() === cityName.toLowerCase()
  );

  // Generate structured data for the first few events
  const eventStructuredData = cityEvents.slice(0, 5).map(generateEventStructuredData);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventStructuredData),
        }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src="/images/cities/default-city.jpg" // You'll need to add city-specific images
          alt={`Evenimente Creștine în ${formattedCity}`}
          fill
          className="object-cover brightness-50"
          priority
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* City Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Evenimente Active</h3>
            <p className="text-3xl font-bold text-[#6a7bff]">{cityEvents.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Categorii</h3>
            <p className="text-3xl font-bold text-[#6a7bff]">
              {new Set(cityEvents.map(e => e.category)).size}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Organizatori</h3>
            <p className="text-3xl font-bold text-[#6a7bff]">
              {new Set(cityEvents.map(e => e.organizer)).size}
            </p>
          </div>
        </div>

        {/* Featured Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Evenimente în {formattedCity}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityEvents.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{event.about.substring(0, 100)}...</p>
                  <Link href={`/events/${event._id}`}>
                    <Button className="w-full bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white">
                      Vezi Detalii
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#6a7bff]/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Vrei să vezi toate evenimentele creștine?
          </h2>
          <p className="text-gray-600 mb-6">
            Explorează platforma completă pentru a descoperi toate evenimentele din {formattedCity} și din țară
          </p>
          <Link href="/">
            <Button className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white">
              Explorează Toate Evenimentele
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
} 