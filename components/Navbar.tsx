import { auth, signOut, signIn } from '@/auth';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-gray-500 shadow-sm ">
      <nav className="flex justify-between items-center">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        {session && session?.user ? (
          <form
            action={async () => {
              'use server';

              await signOut({ redirectTo: '/' });
            }}
          >
            <button type="submit" className="flex items-center">
              <span>Logout</span>
              <LogOut className="size-6 sm:hidden text-red-500" />
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server';

              await signIn('google');
            }}
          >
            <button type="submit">Inregistreaza-te</button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
