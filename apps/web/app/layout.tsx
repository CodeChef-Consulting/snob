import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '../lib/providers';

export const metadata: Metadata = {
  title: 'Best LA Restaurants 2025 | AI-Powered Restaurant Reviews & Ratings',
  description: 'Discover the best restaurants in Los Angeles with AI-powered ratings based on thousands of real Reddit reviews. Find top-rated LA dining spots, hidden gems, and local favorites across all neighborhoods.',
  keywords: [
    'LA restaurants',
    'Los Angeles restaurants',
    'best restaurants LA',
    'LA restaurant reviews',
    'Los Angeles dining',
    'LA food map',
    'restaurant ratings LA',
    'best food in LA',
    'Los Angeles food guide',
    'LA restaurant recommendations',
    'top restaurants Los Angeles',
    'LA restaurant finder',
    'where to eat in LA',
    'LA foodie guide',
    'restaurant reviews Los Angeles'
  ],
  authors: [{ name: 'CodeChef Consulting' }],
  creator: 'CodeChef Consulting',
  publisher: 'CodeChef Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://larestaurants.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Best LA Restaurants 2025 | AI-Powered Restaurant Reviews',
    description: 'Discover the best restaurants in Los Angeles with AI-powered ratings based on thousands of real Reddit reviews.',
    url: 'https://larestaurants.ai',
    siteName: 'LA Restaurant Reviews',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LA Restaurant Map - Best Restaurants in Los Angeles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best LA Restaurants 2025 | AI-Powered Reviews',
    description: 'Discover the best restaurants in Los Angeles with AI-powered ratings based on real Reddit reviews.',
    images: ['/twitter-image.jpg'],
    creator: '@codechefco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'LA Restaurant Reviews',
    applicationCategory: 'LocalBusiness',
    operatingSystem: 'Web',
    description: 'AI-powered restaurant reviews and ratings for Los Angeles based on Reddit community discussions',
    url: 'https://larestaurants.ai',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '10000',
    },
    author: {
      '@type': 'Organization',
      name: 'CodeChef Consulting',
      url: 'https://codechefconsulting.com',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
