import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-center px-4 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center gap-1.5">
          <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-[#6a7bff]" />
          <span className="text-sm md:text-lg font-semibold whitespace-nowrap">
            Evenimente Creștine
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
