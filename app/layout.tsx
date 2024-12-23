import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { GlobalLoading } from '@/components/GlobalLoading';
import { organizationStructuredData } from '@/utils/structuredData';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Evenimente Creștine | Conferințe și întâlniri creștine în România',
    template: '%s | Evenimente Creștine',
  },
  description:
    'Descoperă cele mai importante evenimente creștine din România. Participă la conferințe, concerte, seminarii și întâlniri creștine în comunitatea ta.',
  keywords: [
    'evenimente crestine',
    'evenimente crestine timisoara',
    'conferinte crestine',
    'intalniri crestine',
    'concerte crestine',
    'seminarii crestine',
    'evenimente bisericesti',
    'evenimente spirituale',
  ],
  authors: [{ name: 'Evenimente Creștine' }],
  creator: 'Evenimente Creștine',
  publisher: 'Evenimente Creștine',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://evenimentecrestine.ro',
    siteName: 'Evenimente Creștine',
    title: 'Evenimente Creștine | Conferințe și întâlniri creștine în România',
    description:
      'Descoperă cele mai importante evenimente creștine din România. Participă la conferințe, concerte, seminarii și întâlniri creștine în comunitatea ta.',
    images: [
      {
        url: 'https://evenimentecrestine.ro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evenimente Creștine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evenimente Creștine | Conferințe și întâlniri creștine în România',
    description:
      'Descoperă cele mai importante evenimente creștine din România. Participă la conferințe, concerte, seminarii și întâlniri creștine în comunitatea ta.',
    images: ['/og-image.jpg'], // Same as OpenGraph image
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification', // You'll need to add this
  },
  alternates: {
    canonical: 'https://evenimentecrestine.ro',
    languages: {
      'ro-RO': 'https://evenimentecrestine.ro',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <Analytics />
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta name="theme-color" content="#6a7bff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
