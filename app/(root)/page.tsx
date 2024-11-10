import React from 'react';
import SearchForm from '@/components/SearchForm';
import { ArrowRight } from 'lucide-react';
import { auth } from '@/auth';
import EventsContainer from '@/components/EventsContainer';

export interface EventCardType {
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
  price: string;
}

export const evenimente: EventCardType[] = [
  {
    _id: '1',
    title: 'Festival de Muzică în Parc',
    hour: '18:00',
    month: 'Iunie',
    day: '15',
    location: 'Parcul Central, Ploiești',
    category: 'concerte',
    about: 'Festival de muzică în aer liber cu artiști locali',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2574&auto=format&fit=crop',
    organizer: 'Primăria Ploiești',
    price: 'Gratuit',
  },
  {
    _id: '2',
    title: 'Conferință de Artă Contemporană',
    hour: '10:00',
    month: 'Iunie',
    day: '18',
    location: 'Galeria de Artă Modernă, Ploiești',
    category: 'conferinte',
    about: 'Conferință despre arta contemporană și tendințele actuale',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2580&auto=format&fit=crop',
    organizer: 'Asociația Artiștilor',
    price: 'Gratuit',
  },
  {
    _id: '3',
    title: 'Seminar de Fotografie',
    hour: '14:30',
    month: 'Iunie',
    day: '20',
    location: 'Studio Foto Central, Ploiești',
    category: 'seminarii',
    about: 'Workshop pentru începători în fotografie',
    image:
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop',
    organizer: 'Clubul Fotografilor',
    price: 'Gratuit',
  },
  {
    _id: '4',
    title: 'Concert Simfonic în Aer Liber',
    hour: '19:00',
    month: 'Iunie',
    day: '22',
    location: 'Amfiteatrul Municipal, Ploiești',
    category: 'concerte',
    about: 'Concert simfonic sub cerul liber',
    image:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2669&auto=format&fit=crop',
    organizer: 'Teatrul Municipal',
    price: '130 lei',
  },
  {
    _id: '5',
    title: 'Conferință Gastronomică',
    hour: '12:00',
    month: 'Iunie',
    day: '25',
    location: 'Piața Centrală, Ploiești',
    category: 'conferinte',
    about: 'Conferință despre gastronomia locală și internațională',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Asociația Restaurantelor',
    price: 'Gratuit',
  },
  {
    _id: '6',
    title: 'Seminar de Nutriție',
    hour: '12:00',
    month: 'Iunie',
    day: '16',
    location: 'Centrul Cultural, Ploiești',
    category: 'seminarii',
    about: 'Seminar despre alimentație sănătoasă',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Asociația Nutriționiștilor',
    price: 'Gratuit',
  },
  {
    _id: '7',
    title: 'Concert Rock în Parc',
    hour: '20:00',
    month: 'Iunie',
    day: '21',
    location: 'Parcul Tineretului, Ploiești',
    category: 'concerte',
    about: 'Concert rock cu trupe locale',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Rock Events',
    price: '25 lei',
  },
  {
    _id: '8',
    title: 'Festival de Jazz',
    hour: '19:00',
    month: 'August',
    day: '16',
    location: 'Piața Centrală, Ploiești',
    category: 'concerte',
    about: 'Festival internațional de jazz',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Jazz Association',
    price: 'Gratuit',
  },
  {
    _id: '9',
    title: 'Festival de Jazz',
    hour: '19:00',
    month: 'Iunie',
    day: '16',
    location: 'Piața Centrală, Ploiești',
    category: 'concerte',
    about: 'Festival internațional de jazz',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2670&auto=format&fit=crop',
    organizer: 'Jazz Association',
    price: 'Gratuit',
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

        <SearchForm evenimente={evenimente} />
        <EventsContainer evenimente={evenimente} />
      </div>
    </div>
  );
}

export default App;
