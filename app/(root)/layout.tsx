import Navbar from '@/components/Navbar';

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
