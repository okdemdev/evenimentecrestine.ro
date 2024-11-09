import { auth, signIn, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { BookOpen, LogIn, Zap } from 'lucide-react';

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between px-3 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-5 w-5 text-[#6a7bff]" />
          <span className="hidden md:inline-block">Evenimente Crestine</span>
        </div>
        {session?.user ? (
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button
              size="sm"
              className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white text-sm font-medium"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <Button
              size="sm"
              className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white text-sm font-medium"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Conectare
            </Button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
