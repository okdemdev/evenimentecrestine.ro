import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between px-3 md:px-8 max-w-[1400px] mx-auto">
        {/* Left side - empty for centering */}
        <div className="w-[120px]" /> {/* Spacer */}
        {/* Center - Logo and text */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#6a7bff]" />
            <span className="text-lg font-semibold">Evenimente Creștine</span>
          </div>
        </Link>
        {/* Right side - empty for centering */}
        <div className="w-[120px]" /> {/* Spacer */}
      </nav>
    </header>
  );
};

export default Navbar;
