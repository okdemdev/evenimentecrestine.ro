import SearchForm from '@/components/SearchForm';
import EventCard from '@/components/EventCard';
import { ArrowRight } from 'lucide-react';
import { auth } from '@/auth';

interface EventCardType {
  _id: string;
  title: string;
  hour: string;
  month: string;
  day: string;
  location: string;
  category: string;
  about: string;
  image: string;
  organizer: string;
}

const evenimente: EventCardType[] = [
  {
    _id: '1',
    title: 'Festival de Muzică în Parc',
    hour: '18:00',
    month: 'Iunie',
    day: '15',
    location: 'Parcul Central, Ploiești',
    category: 'Muzică',
    about: 'Festival de muzică în aer liber cu artiști locali',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop',
    organizer: 'Primăria Ploiești',
  },
  {
    _id: '2',
    title: 'Expoziție de Artă Contemporană',
    hour: '10:00',
    month: 'Iunie',
    day: '18',
    location: 'Galeria de Artă Modernă, Ploiești',
    category: 'Artă',
    about: 'Expoziție cu lucrări ale artiștilor contemporani',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2580&auto=format&fit=crop',
    organizer: 'Asociația Artiștilor',
  },
  {
    _id: '3',
    title: 'Workshop de Fotografie',
    hour: '14:30',
    month: 'Iunie',
    day: '20',
    location: 'Studio Foto Central, Ploiești',
    category: 'Educație',
    about: 'Workshop pentru începători în fotografie',
    image:
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop',
    organizer: 'Clubul Fotografilor',
  },
  {
    _id: '4',
    title: 'Teatru în Aer Liber',
    hour: '19:00',
    month: 'Iunie',
    day: '22',
    location: 'Amfiteatrul Municipal, Ploiești',
    category: 'Teatru',
    about: 'Spectacol de teatru sub cerul liber',
    image:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2669&auto=format&fit=crop',
    organizer: 'Teatrul Municipal',
  },
  {
    _id: '5',
    title: 'Festival Gastronomic',
    hour: '12:00',
    month: 'Iunie',
    day: '25',
    location: 'Piața Centrală, Ploiești',
    category: 'Culinar',
    about: 'Festival cu specific local și internațional',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Asociația Restaurantelor',
  },
];

async function App() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-3 md:px-8">
        {session && session?.user ? (
          <h2 className="mt-6 md:mt-8 text-lg md:text-xl font-bold text-[#333]">
            Bun venit, {session.user.name} 👋!
          </h2>
        ) : null}
        <SearchForm />

        <div className="mt-6 md:mt-8 mb-3 md:mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold text-[#333]">Evenimente din apropiere</h2>
            <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Vezi toate
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Gradient Fade Effect */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Cards Container */}
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 md:pb-4 scroll-smooth snap-x">
            {evenimente.length > 0 ? (
              evenimente.map((eveniment) => (
                <div key={eveniment._id} className="snap-start">
                  <EventCard event={eveniment} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nu au fost găsite evenimente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
