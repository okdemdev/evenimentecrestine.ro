import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center px-3 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-5 w-5 text-[#6a7bff]" />
          <span className="hidden md:inline-block">Evenimente Crestine</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
