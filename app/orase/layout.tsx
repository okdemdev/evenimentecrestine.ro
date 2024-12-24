import { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | Evenimente Creștine în Orașul Tău',
    default: 'Evenimente Creștine în Orașe din România',
  },
  description:
    'Descoperă evenimente creștine în orașul tău. Conferințe, concerte, seminarii și întâlniri creștine locale.',
  alternates: {
    canonical: 'https://evenimentecrestine.ro/orase',
  },
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  );
} 