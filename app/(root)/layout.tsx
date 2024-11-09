import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
